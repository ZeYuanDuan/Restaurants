const express = require('express')
const router = express.Router()

const db = require('./models')
const Restaurant = db.Restaurant

router.get('/', (req, res) => {
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((err) => res.status(422).json(err))
})

router.post('/', async (req, res) => {
  const body = req.body

  return await Restaurant.create(body)
    .then(() => {
      res.render('detail', { restaurant: body })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).send('尚未建立任何餐廳')
      }
      res.render('detail', { restaurant })
    })
    .catch((err) => res.status(422).json(err))
})

router.put('/:id', (req, res) => {
  const { id } = req.params

  return Restaurant.update(req.body, { where: { id } })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => {
      res.status(500).send('更新資料庫出現錯誤')
      console.error(err)
    })
})

router.get('/:id/edit', (req, res) => {
  const { id } = req.params

  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => {
      console.error(err)
      res.status(500).send('更新資料庫出現錯誤')
    })
})

router.post('/:id/delete', (req, res) => {
  const { id } = req.params

  return Restaurant.destroy({ where: { id } })
    .then(() => {
      res.redirect('/restaurants')
    })
    .catch((err) => {
      res.status(500).send('刪除資料庫出現錯誤')
      console.error(err)
    })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword?.trim()?.toLowerCase()

  return Restaurant.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          name: {
            [db.Sequelize.Op.like]: `%${keyword}%`
          }
        },
        {
          category: {
            [db.Sequelize.Op.like]: `%${keyword}%`
          }
        }
      ]
    },
    raw: true
  })
    .then((matchedRest) => {
      res.render('index', { restaurants: matchedRest, keyword })
    })
    .catch((err) => res.status(422).json(err))
})
