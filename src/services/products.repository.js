import ProductDto from "../dto/productDto.js"
class ProductRepository {
    constructor(productDao){
        this.dao = productDao
    }

    getProducts   = async () => await this.dao.find()
    getProduct    = async (filter) => await this.dao.findOne(filter)
    createProduct = async (newProduct) => {
        const newProductDto = new ProductDto(newProduct)
        return await this.dao.create(newProductDto)
    }
    updateProduct = async (pid, productToUpdate) => await this.dao.findByIdAndUpdate({_id: pid}, productToUpdate, {new: true})
    deleteProduct = async (pid) => await this.dao.deleteOne({_id: pid})
}

export default ProductRepository