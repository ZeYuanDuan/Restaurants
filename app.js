const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

const db = require("./models");
const Restaurant = db.Restaurant;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

// app.get("/test", (req, res) => {
//   return Restaurant.findAll({
//     attributes: [
//       `id`,
//       `name`,
//       `name_en`,
//       `category`,
//       `image`,
//       `location`,
//       `phone`,
//       `google_map`,
//       `rating`,
//       `description`,
//     ],
//     raw: true,
//   })
//     .then((rest) => res.send({ rest }))
//     .catch((err) => res.status(422).json(err));
// });

app.get("/restaurants", (req, res) => {
  res.render("index", { restaurants });
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((rest) => rest.id.toString() === id);
  res.render("detail", { restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim()?.toLowerCase();
  const matchedRest = keyword
    ? restaurants.filter((rest) =>
        ["name", "category"].some((attr) =>
          rest[attr].toLowerCase().includes(keyword)
        )
      )
    : restaurants;
  res.render("index", { restaurants: matchedRest, keyword });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
