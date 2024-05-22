const db = require('../models')

const buildQueryOptions = (keyword, sort, limit, offset) => {
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

  return options
}

module.exports = buildQueryOptions
