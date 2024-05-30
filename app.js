const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const port = 3000

require('dotenv').config()

// if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config()
// }
console.log('Session Secret:', process.env.SESSION_SECRET) // Verify Session Secret

const { engine } = require('express-handlebars')
app.set('view engine', '.hbs')
app.set('views', './views')
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      getImage: function (image) {
        return image || defaultImage
      },
      getRating: function (rating) {
        return rating || defaultRating
      },
      eq: function (a, b) {
        return a === b
      }
    }
  })
)

const defaultImage =
  'https://plus.unsplash.com/premium_photo-1674004585426-c6ad2adbe4c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D'
const defaultRating = '尚無評分'

// =============== Middlewares ===============
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(flash())

const router = require('./routes')
app.use(router)
// =============== Middlewares ===============

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
