const express = require("express");
const app = express();
const port = 3000;

const db = require("./models");
const Restaurant = db.Restaurant;

const { engine } = require("express-handlebars");
app.set("view engine", ".hbs");
app.set("views", "./views");
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      getImage: function (image) {
        return image || defaultImage;
      },
      getRating: function (rating) {
        return rating || defaultRating;
      },
    },
  })
);

const defaultImage =
  "https://files.oaiusercontent.com/file-M3zDX7pdTXc99vuXBiaVfkmq?se=2024-04-28T05%3A53%3A26Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Daa6d215c-9c60-4252-99bb-b87ae6215305.webp&sig=g7AnWZ49hXmDcxtJCufgcWB9HCMr7omoY7EA3DKYiuA%3D";
const defaultRating = "尚無評分";

// =============== Middlewares ===============
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// =============== Middlewares ===============

// =============== Routers ===============
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

app.post("/restaurants", async (req, res) => {
  const body = req.body;

  return await Restaurant.create(body)
    .then(() => {
      res.render("detail", { restaurant: body });
    })
    .catch((error) => console.log(error));
});

app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

app.get("/restaurants/:id", (req, res) => {
  const { id } = req.params;

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

app.put("/restaurants/:id", (req, res) => {
  const { id } = req.params;

  return Restaurant.update(req.body, { where: { id } })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => {
      res.status(500).send("更新資料庫出現錯誤");
      console.error(error);
    });
});

app.get("/restaurants/:id/edit", (req, res) => {
  const { id } = req.params;

  return Restaurant.findByPk(id, {
    raw: true,
  })
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => {
      console.error(error);
      res.status(500).send("更新資料庫出現錯誤");
    });
});

app.get("/restaurants/:id/delete", (req, res) => {
  const { id } = req.params;

  return Restaurant.destroy({ where: { id } })
    .then(() => {
      res.redirect("/restaurants");
    })
    .catch((error) => {
      res.status(500).send("刪除資料庫出現錯誤");
      console.error(error);
    });
});

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
    raw: true,
  })
    .then((matchedRest) => {
      res.render("index", { restaurants: matchedRest, keyword });
    })
    .catch((err) => res.status(422).json(err));
});
// =============== Routers ===============

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
