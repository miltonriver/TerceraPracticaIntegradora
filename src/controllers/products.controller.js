// import ProductDaoMongo from "../daos/Mongo/productsDaoMongo.js";
// import DAOFactory from "../daos/factory.js";
import { productService } from "../services/index.js";
import CustomError from "../services/errors/CustomError.js";
import generateProductErrorInfo from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";

// const products = []
class ProductController {
    constructor() {
        this.productService = productService
    }

    getProducts   = async (req, res) => {
        try {
            // const products = await productsModel.find({})
            const products = await this.productService.getProducts({})
            res.status(200).send({
                status: 'succes',
                message: 'Colección de productos',
                result: products
            })
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getProduct    = async (req, res) => {
        try {
            const { pid } = req.params
            const product = await this.productService.getProduct({ _id: pid })
            res.status(200).send({
                status: 'succes',
                message: `Producto ${product.title} con id "${pid}" encontrado`,
                result: product
            })
        } catch (error) {
            console.log(error)
            return error
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const { title, description, price, thumbnail, code, stock, status, category } = req.body;

            if(!title || !price || !code || !stock) {
                CustomError.createError({
                    name: "Product creation error",
                    cause: generateProductErrorInfo({
                        title,
                        price,
                        code,
                        stock
                    }),
                    message: "Error trying to create product",
                    code: EErrors.INVALID_TYPES_ERROR
                })                
            }

            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status,
                category
            }
            console.log("Nuevo producto:", newProduct)
            const result = await this.productService.createProduct(newProduct)

            res.status(201).send({
                status: "success",
                message: `El producto de nombre ${newProduct.title} con código ${newProduct.code} ha sido agregado exitosamente`,
                result: result
            });
        } catch (error) {
            next(error)
            // console.error('Error al agregar producto', error)
            // res.status(500).send({
            //     status: 'error',
            //     message: 'Error interno al agregar producto'
            // })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const productToUpdate = req.body

            const result = await this.productService.updateProduct({ _id: pid }, productToUpdate)

            res.status(200).send({
                status: 'succes',
                message: `El producto "${result.title}" con código ${result.code} ha sido actualizado`,
                result: result
            })
        } catch (error) {
            console.error('Error al intentar actualizar el producto', error)
            res.status(500).send({
                status: 'error',
                message: 'Error interno al actualizar el producto'
            })
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const deleteProduct = await this.productService.deleteProduct({ _id: pid })

            if (!deleteProduct) {
                return res.status(400).send({
                    status: 'Error',
                    message: `El producto cuyo ID es "${pid}" no existe dentro del catálogo`,
                    deleteProduct
                })
            }

            return res.status(200).send({
                status: 'succes',
                message: `El producto de ID "${pid}" ha sido eliminado`,
            })

        } catch (error) {
            console.error('Error al intentar eliminar el producto:', error);
            res.status(500).send({
                status: error,
                message: 'Error interno al intentar eliminar el producto'
            });
        }
    }
}

export default ProductController