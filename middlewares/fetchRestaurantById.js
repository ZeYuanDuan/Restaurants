const db = require('../models')
const Restaurant = db.Restaurant

const fetchRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
    if (!restaurant) {
      return res.status(404).send('尚未建立餐廳')
    }
    req.restaurant = restaurant
    next()
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = fetchRestaurantById
