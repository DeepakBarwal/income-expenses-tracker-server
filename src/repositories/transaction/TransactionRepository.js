import CrudRepository from "../crudRepository.js";
import Transaction from "../../models/Transaction.js";

class TransactionRepository extends CrudRepository {
  constructor() {
    super(Transaction);
  }
}

export default TransactionRepository;
