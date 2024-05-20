const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const port = 3000

const db = require('./models')
const Restaurant = db.Restaurant

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
      }
    }
  })
)

const defaultImage =
  'https://files.oaiusercontent.com/file-M3zDX7pdTXc99vuXBiaVfkmq?se=2024-04-28T05%3A53%3A26Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Daa6d215c-9c60-4252-99bb-b87ae6215305.webp&sig=g7AnWZ49hXmDcxtJCufgcWB9HCMr7omoY7EA3DKYiuA%3D'
const defaultRating = '尚無評分'

// =============== Middlewares ===============
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'ThisIsSecret',
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
