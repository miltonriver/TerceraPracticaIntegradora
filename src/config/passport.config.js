import passport from "passport";
import local from "passport-local";
import UserManagerMongo from "../daos/Mongo/userDaoMongo.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import GithubStrategy from "passport-github2";

const LocalStrategy = local.Strategy
const userModel = new UserManagerMongo()

const initializePassport = () => {
    passport.use('registerpassport', new LocalStrategy({
        passReqToCallback: true, //para acceder al objeto req
        // usernameField: 'username'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, phone_number } = req.body
        try {
            let user = await userModel.getUser(username)

            if (user) return done(null, false)

            let newUser = {
                first_name,
                last_name,
                username,
                email,
                password: createHash(password),
                phone_number
            }

            let result = await userModel.createUser(newUser)

            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('loginpassport', new LocalStrategy({
        // usernameField: 'username'
    }, async(username, password, done) => {
        try {
            const user = await userModel.getUser(username)
            if(!user) {
                console.log("usuario no encontrado")
                return done(null, false)
            }

            /* if (user.username === "coderhouse") {
                user.role = "admin",
                    res.render('adminPage', {
                        username: username,
                        style: 'index.css'
                    })
            } */
            
            if(!isValidPassword(password, user.password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })
    passport.deserializeUser(async (username, done) => {
        let user = await userModel.getUser(username)
        done(null, user)
    })

    passport.use("github", new GithubStrategy({
        clientID: "Iv1.c2c12058150226c2",
        clientSecret: "12635beb449619a17e5b8a3d75707273a4c13933",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("profile: ", profile)
        console.log("Estrategia Github configurada correctamente")
        try {
            let user = await userModel.getUser(profile._json.login)
            // console.log("Profile username github: ", profile.username)
            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.company,
                    username: profile._json.login,
                    email: profile._json.email,
                    password: profile._json.id,
                    role: "admin"
                }

                let result = await userModel.createUser(newUser)
                return done(null, result)
            }

            return done(null, user)
        } catch (error) {
            done(error)            
        }
    }))
}

export default initializePassport