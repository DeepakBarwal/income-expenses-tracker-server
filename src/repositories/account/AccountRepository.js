import Account from "../../models/Account.js";
import CrudRepository from "../CrudRepository.js";
import mongoose from "mongoose";

class AccountRepository extends CrudRepository {
  constructor() {
    super(Account);
  }

  async getAllAccountsAndPopulate(userId, populateCriteria) {
    try {
      const allAccounts = await Account.find({ createdBy: userId }).populate(
        populateCriteria.populateOn
      );
      return allAccounts;
    } catch (error) {
      console.log(`Something went wrong in Account repo layer: ${error}`);
      throw error;
    }
  }

  async getSingleAccountAndPopulate(id, populateCriteria) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid ObjectId received");
      }
      const account = await Account.findById(id).populate(
        populateCriteria.populateOn
      );
      return account;
    } catch (error) {
      console.log(`Something went wrong in Account repo layer: ${error}`);
      throw error;
    }
  }
}

export default AccountRepository;
