const express = require('express')
const peopleSelectTreeController = require('./peopleSelectTree/controller')

const controllers = { ...peopleSelectTreeController }

const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

for (const path of Object.keys(controllers)) {
  app[controllers[path].method](path, controllers[path].callback)
}

app.listen(3000, () => {
  console.log('Server listening on: http://localhost:3000')
})
