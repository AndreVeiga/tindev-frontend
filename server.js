
const express = require('express')
const routes = require('./src/routes')
const app = express()

const port = process.env.PORT || 3333

app.use(routes)

app.listen(port, () => console.log('Servidor rodando na porta localhost/3333'))