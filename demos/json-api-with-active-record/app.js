'use strict'

const express = require('express')
const cors = require('cors')

const posts = require('./controller/posts')

const host = '0.0.0.0';
const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', posts)

process.on('uncaughtException', error => console.error('Uncaught exception: ', error));
process.on('unhandledRejection', error => console.error('Unhandled rejection: ', error));

app.listen(port, host, () => console.log(`listening at http://${host}:${port}`))
