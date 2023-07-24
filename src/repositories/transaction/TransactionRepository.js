import CrudRepository from "../CrudRepository.js";
import Transaction from "../../models/Transaction.js";

class TransactionRepository extends CrudRepository {
  constructor() {
    super(Transaction);
  }
}

export default TransactionRepository;
