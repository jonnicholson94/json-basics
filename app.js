
const express = require("express")
const app = express()

const router = require('./routes/api')

const { logger, authorise } = require("./middleware")

const port = 3000

app.use('/api', [authorise, logger])
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", router)

app.get("/", (req, res) => {
    res.send('<h1>Homepage</h1><a href="/about">About</a><a href="/api/products">Products</a>')
})

app.get("/about", (req, res) => {
    res.send("<h1>About</h1><a href='/'>Home</a>")
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})