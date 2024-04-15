import { connect } from "mongoose";

class MongoSingleton {
    static #instance
    constructor(mongo_url){
        connect(mongo_url)
    }

    static getInstance = (mongo_url) => {
        if (this.#instance) {
            console.log("Base de datos previamente conectada")
            return this.#instance
        }

        this.#instance = new MongoSingleton(mongo_url)
        console.log('Base de datos conectada')
        return this.#instance
    }
}

export default MongoSingleton