
const express = require("express")

const router = express.Router()

const { products, people } = require("../data.js")

router.get("/products", (req, res) => {

    const newProducts = products.map(p => {
        const { id, name, image } = p 

        return { id, name, image }
    })
    res.json(newProducts)
})

router.get("/products/:id", (req, res) => {

    const { id } = req.params

    const singleProduct = products.find((p) => p.id === id)

    if (!singleProduct) {
        return res.status(404).send("Product does not exist")
    }

    return res.json(singleProduct)
})

router.get("/products/:id/single/:name", (req, res) => {

    const { id, name } = req.params 

    console.log(id, name);
}) 

router.get("/v1/query", (req, res) => {
    console.log(req.query);

    const { search, limit } = req.query 

    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((p) => {
            return p.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if (sortedProducts.length === 0) {
        res.status(200).send({ success: "true", data: [] })
    }

    res.status(200).json(sortedProducts)
})

router.get("/people", (req, res) => {
    res.status(200).json(people)
})

router.post("/people", (req, res) => {
    console.log(req.body);
    const { name } = req.body 

    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    } 

    if (!name) {
        return res.status(401).send("Access forbidden")
    }
})

module.exports = router