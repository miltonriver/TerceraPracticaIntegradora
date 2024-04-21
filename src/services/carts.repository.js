import CartDto from "../dto/cartDto.js";

class CartRepository {
    constructor(cartDao){
        this.dao = cartDao
    }

    getCarts   = async () => await this.dao.find()
    getCart    = async (filter) => await this.dao.findOne(filter)
    createCart = async (newCart) => {
        const newCartDto = new CartDto(newCart)
        return await this.dao.create(newCartDto)
    }
    updateCart = async (cid, cartToUpdate) => await this.dao.findByIdAndUpate({_id: cid}, cartToUpdate, {new: true})
    deleteCart = async (cid) => await this.dao.deleteOne({_id: cid})
}

export default CartRepository