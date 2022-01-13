const express = require('express')
const peopleSelectTreeController = require('./peopleSelectTree/controller')

const controllers = { ...peopleSelectTreeController }

const app = express()

for (const path of Object.keys(controllers)) {
  app[controllers[path].method](path, controllers[path].callback)
}

app.listen(3000, () => {
  console.log('Server listening on: http://localhost:3000')
})
