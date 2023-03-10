
const logger = (req, res, next) => {
    const method = req.method 
    const url = req.url 
    const time = new Date().getFullYear()
    console.log(method, url, time);
    next()
}

const authorise = (req, res, next) => {

    const { user } = req.query

    if (!user) {
        res.status(401).send("User not authorised")
    } else if (user === 'Jon') {
        req.user = { name: "Jon", id: 3 }
        next()
    }
    
}

module.exports = { logger, authorise }