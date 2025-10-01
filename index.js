import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

let users = []

app.get('/user', (req, res) => {
    res.json(users)
})

app.post('/user', (req, res) => {
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


    // users = users.filter(user => user.id != id)
    // users.push({
    //     name: user.name,
    //     age: user.age,
    //     id: id
    // })
    // console.log(user);
    // console.log(users);



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
