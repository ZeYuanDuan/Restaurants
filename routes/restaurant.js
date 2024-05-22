const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

const fetchRestaurantById = require('../middlewares/fetchRestaurantById')

router.get('/', async (req, res) => {
  const { keyword, sort } = req.query
  const page = parseInt(req.query.page) || 1
  const limit = 9
  const offset = (page - 1) * limit

  const options = {
    raw: true,
    limit,
    offset,
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

  const totalItems = await Restaurant.count(options)
  const totalPages = Math.ceil(totalItems / limit)

  return Restaurant.findAll(options)
    .then((restaurants) => {
      return res.render('index', {
        restaurants,
        totalPages,
        prev: page > 1 ? page - 1 : null,
        next: page < totalPages ? page + 1 : null,
        page,
        keyword,
        sort
      })
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

router.get('/:id', fetchRestaurantById, (req, res) => {
  res.render('detail', { restaurant: req.restaurant })
})

router.put('/:id', fetchRestaurantById, (req, res) => {
  const { id } = req.params

  return Restaurant.update(req.body, { where: { id } })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => {
      res.status(500).send('更新資料庫出現錯誤')
      console.error(err)
    })
})

router.get('/:id/edit', fetchRestaurantById, (req, res) => {
  res.render('edit', { restaurant: req.restaurant })
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
