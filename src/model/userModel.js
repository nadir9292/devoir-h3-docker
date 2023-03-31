import { Model } from "objection"
import hashPassword from "../method/hashPassword.js"

class UserModel extends Model {
  static tableName = "users"

  checkPassword(password) {
    const [passwordHash] = hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }

  static findUserByPseudo(pseudo) {
    return UserModel.query().findOne({ pseudo })
  }

  static findUserById(id) {
    return UserModel.query().findOne({ id })
  }
}

export default UserModel
