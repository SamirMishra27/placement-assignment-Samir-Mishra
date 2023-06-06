const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = 3000
const app = express()

app.get('/', (request, response) => {
    response.status(200).send('Solution to question 52!!')
})

app.get('/posts', async (request, response) => {

    const data = await fs.readFileSync(path.resolve('./posts.json'), { encoding: 'utf-8' })
    const posts = JSON.stringify(JSON.parse(data))
    response.status(200).send(posts)
})

app.listen(PORT, () => {
    console.log('Listening to port ' + PORT)
})