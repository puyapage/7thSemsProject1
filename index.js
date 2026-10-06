const PORT = 8000
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

// Address of the "burgers" collection in the Astra Data API
const COLLECTION_URL = `${process.env.ASTRA_DB_API_ENDPOINT}/api/json/v1/default_keyspace/burgers`

// Get all the burgers
app.get('/burgers', async (req, res) => {
    try {
        const response = await fetch(COLLECTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: process.env.ASTRA_DB_APPLICATION_TOKEN
            },
            body: JSON.stringify({ find: {} })
        })
        const json = await response.json()
        res.json(json)
    } catch (err) {
        console.log('error: ' + err)
        res.status(500).json({ message: 'Failed to fetch burgers' })
    }
})

function notFound(req, res, next) {
    res.status(404)
    const error = new Error('Not Found')
    next(error)
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500)
    res.json({
        message: error.message
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))