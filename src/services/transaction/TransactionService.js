import { TransactionRepository } from "../../repositories/index.js";

class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }
}

export default TransactionService;
