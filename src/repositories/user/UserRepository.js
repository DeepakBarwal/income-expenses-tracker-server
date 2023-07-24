import User from "../../models/User.js";
import CrudRepository from "../CrudRepository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error(`Something went wrong at user repository layer: ${error}`);
      throw error;
    }
  }

  async getAllUsersAndPopulate(userId, populateCriteria) {
    try {
      const user = await User.findById(userId).populate({
        path: "accounts",
        populate: {
          path: "transactions",
          model: "Transaction",
        },
      });
      return user;
    } catch (error) {
      console.error(`Something went wrong at user repository layer: ${error}`);
      throw error;
    }
  }
}

export default UserRepository;
