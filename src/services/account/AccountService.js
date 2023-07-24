import { AccountRepository } from "../../repositories/index.js";

class AccountService {
  constructor() {
    this.accountRepository = new AccountRepository();
  }
}

export default AccountService;
