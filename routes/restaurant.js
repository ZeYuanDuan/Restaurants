const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res) => {
  const { keyword, sort } = req.query
  const options = {
    raw: true,
    order: []
  }

  if (keyword) {
    options.where = {
      [db.Sequelize.Op.or]: [
        { name: { [db.Sequelize.Op.like]: `%${keyword}%` } },
        { category: { [db.Sequelize.Op.like]: `%${keyword}%` } }
      ]
    }
  }

  if (sort) {
    switch (sort) {
      case 'A-Z':
        options.order.push(['name', 'ASC'])
        break
      case 'Z-A':
        options.order.push(['name', 'DESC'])
        break
      case 'category':
        options.order.push(['category', 'ASC'])
        break
      case 'location':
        options.order.push(['location', 'ASC'])
        break
    }
  }

  return Restaurant.findAll(options)
    .then((restaurants) => {
      return res.render('index', { restaurants, keyword, sort })
    })
    .catch((err) => res.status(422).json(err))
})

router.post('/', async (req, res) => {
  const body = req.body

  return await Restaurant.create(body)
    .then(() => {
      res.status(201).render('detail', { restaurant: body })
    })
    .catch((err) => {
      res.status(422).json(err)
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

router.delete('/:id', (req, res) => {
  const { id } = req.params

  return Restaurant.destroy({ where: { id } })
    .then(() => {
      res.json({ success: true })
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: '刪除資料庫出現錯誤' })
      console.error(err)
    })
})

module.exports = router
