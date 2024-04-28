const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

// const restaurants = require("./public/jsons/restaurant.json").results;
const methodOverride = require("method-override");

const db = require("./models");
const Restaurant = db.Restaurant;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  return Restaurant.findAll({
    raw: true,
  })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((err) => res.status(422).json(err));
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;

  return Restaurant.findByPk(id, {
    raw: true,
  })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).send("尚未建立任何餐廳");
      }
      res.render("detail", { restaurant });
    })
    .catch((err) => res.status(422).json(err));
});

// app.get("/restaurants/:id", (req, res) => {
//   const id = req.params.id;
//   const restaurant = restaurants.find((rest) => rest.id.toString() === id);
//   res.render("detail", { restaurant });
// });

app.get("/restaurants/:id/edit", (req, res) => {
  id = req.params.id;

  return Restaurant.findByPk(id, {
    raw: true,
  })
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => {
      console.error(error);
      res.status(500).send("更新資料庫出現錯誤");
    });
});

app.put("/restaurants/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Restaurant.update(req.body, { where: { id } });
    res.redirect(`/restaurants/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("更新資料庫出現錯誤");
  }
});

// app.get("/search", (req, res) => {
//   const keyword = req.query.keyword?.trim()?.toLowerCase();
//   const matchedRest = keyword
//     ? restaurants.filter((rest) =>
//         ["name", "category"].some((attr) =>
//           rest[attr].toLowerCase().includes(keyword)
//         )
//       )
//     : restaurants;
//   res.render("index", { restaurants: matchedRest, keyword });
// });

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim()?.toLowerCase();

  return Restaurant.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          name: {
            [db.Sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          category: {
            [db.Sequelize.Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    // attributes: attributes,
    raw: true,
  })
    .then((matchedRest) => {
      res.render("index", { restaurants: matchedRest, keyword });
    })
    .catch((err) => res.status(422).json(err));
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
