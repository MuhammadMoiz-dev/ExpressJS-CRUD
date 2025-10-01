import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

let users = []

app.get('/user', (req, res) => {
    res.send(users)
})

app.post('/user', (req, res) => {


    users = []
    const newUsers = req.body.map(user => ({
        ...user,
        id: Math.floor(Math.random() * 535353)
    }))

    users = users.concat(newUsers)  // Append new users

    res.send('Post successfully')
})


app.patch('/user/:id', (req, res) => {
    const { id } = req.params
    const user = req.body
    let update = users.find(data => {
        return data.id == id
    })
    console.log(update);
    Object.assign(update, { ...user, id })

    res.send(users)
})

app.put('/user/:id', (req, res) => {
    const { id } = req.params
    const user = req.body
    let update = users.find(data => {
        return data.id == id
    })
    console.log(update);
    Object.assign(update, { ...user, id })

    res.send(users)
})

app.delete('/user/:id', (req, res) => {
    const id = Number(req.params.id)

    const initialLength = users.length

    users = users.filter(user => user.id !== id)
    res.send(users)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
