import {
  TransactionService,
  AccountService,
  UserService,
} from "../../services/index.js";
import AppErrors from "../../utils/AppErrors.js";

const transactionService = new TransactionService();
const accountService = new AccountService();
const userService = new UserService();

const createTransactionController = async (req, res, next) => {
  const {
    name,
    amount,
    transactionType,
    category,
    notes,
    accountId,
    color,
    date,
  } = req.body;

  if (
    !name ||
    !amount ||
    !transactionType ||
    !category ||
    !notes ||
    !accountId
  ) {
    return next(new AppErrors("Please provide all fields", 400));
  }

  const transactionObj = {
    name,
    amount,
    transactionType,
    category,
    notes,
    accountId,
  };

  if (color) transactionObj.color = color;
  if (date) transactionObj.date = date;

  try {
    // Find the user
    const loggedInUser = await userService.userRepository.get(req.userId);
    if (!loggedInUser) {
      return next(new AppErrors("User not found", 404));
    }

    // Find the account
    const accountFound = await accountService.accountRepository.get(accountId);
    if (!accountFound) {
      return next(new AppErrors("Account not found", 404));
    }

    // Create the transaction
    const transaction = await transactionService.transactionRepository.create({
      ...transactionObj,
      createdBy: loggedInUser._id,
    });

    // Push the transaction to the account
    accountFound.transactions.push(transaction._id);

    // Re-save the account
    await accountFound.save();

    res.json({ status: "success", data: transaction });
  } catch (error) {
    next(new AppErrors(error.message, 404));
  }
};

const getAllTransactionsController = async (req, res, next) => {
  try {
    const allTransactions =
      await transactionService.transactionRepository.getAll();
    res.json({ status: "success", data: allTransactions });
  } catch (error) {
    next(new AppErrors(error.message, 404));
  }
};

const getSingleTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.transactionRepository.get(id);
    res.json({ status: "success", data: transaction });
  } catch (error) {
    next(new AppErrors(error.message, 404));
  }
};

const deleteTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await transactionService.transactionRepository.delete(id);
    res.json({ status: "success", data: null });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

const updateTransactionController = async (req, res, next) => {
  const updateObj = {};
  const { name, transactionType, amount, category, color, notes } = req.body;
  const temp = { name, transactionType, amount, category, color, notes };
  for (const key in temp) {
    if (temp[key]) {
      updateObj[key] = temp[key];
    }
  }
  try {
    const { id } = req.params;
    const updatedTransaction =
      await transactionService.transactionRepository.update(id, updateObj);
    res.json({ status: "success", data: updatedTransaction });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

export {
  createTransactionController,
  getAllTransactionsController,
  getSingleTransactionController,
  deleteTransactionController,
  updateTransactionController,
};
