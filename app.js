const express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , helmet = require('helmet')
  , compression = require('compression')
  , port = process.env.PORT || 3000

  
app.set('view engine', 'ejs')
app.set('views', './views/pages')

app.use(helmet())  // security
app.use(compression()); //Compress all routes
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

app.listen(port, () => console.log(`Listening on port ${port}`))
