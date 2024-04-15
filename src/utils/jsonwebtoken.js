import jwt from "jsonwebtoken";

const private_key = "palabarasecretaparatoken"
const generateToken = (user) => jwt.sign(user, private_key, {expiresIn: "24h"})

export const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)

    if(!authHeader) return res.status(401).send({status: "error", message: "token invalid"})

    const token = authHeader.split(' ')[1]

    jwt.verify(token, private_key, (error, decodeUser) => {
        if(error) return res.status(401).send({status: "error", message: "no authorizated"})

        req.user = decodeUser
        next()
    })
}

export default generateToken