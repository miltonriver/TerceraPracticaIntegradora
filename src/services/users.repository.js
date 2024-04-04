import UserDto from "../dto/userDto.js";

class UserRepository {
    constructor(userDao){
        this.dao = userDao
    }

    getUsers   = async () => await this.dao.find()
    getUser    = async (username) => await this.dao.findOne(username)
    createUser = async (newUser) => {
        const newUserDto = new UserDto(newUser)
        console.log("mostrar nuevo usuario a agregar", newUserDto)
        return await this.dao.create(newUserDto)
    }
    updateUser = async (uid, userToUpdate) => await this.dao.findByIdAndUpdate({_id: uid}, userToUpdate, {new: true})
    deleteUser = async (uid) => await this.dao.deleteOne({_id: uid})
}

export default UserRepository