import productModel from "./models/products.model.js"

class ProductDaoMongo {
    async get(){
        return await productModel.paginate({})
    }

    async getBy(pid){
        return await productModel.findOne({_id: pid})
    }
    
    async create(newProduct){
        return await productModel.create(newProduct)
    }
    
    async update(pid, productToUpdate){
        return await productModel.findOneAndUpdate({_id: pid}, productToUpdate, {new: true})
    }
    
    async delete(pid){
        return await productModel.deleteOne({_id: pid})
    }
}

export default ProductDaoMongo