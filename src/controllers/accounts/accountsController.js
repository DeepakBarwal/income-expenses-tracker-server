import { AccountService, UserService } from "../../services/index.js";
import AppErrors from "../../utils/AppErrors.js";

const accountService = new AccountService();
const userService = new UserService();

const createAccountController = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  if (!name || !accountType || !notes) {
    return next(new AppErrors("Please provide all fields", 400));
  }

  try {
    // Find the logged in user
    const loggedInUser = await userService.userRepository.get(req.userId);
    if (!loggedInUser) {
      return next(new AppErrors("User not found", 404));
    }

    // create the account
    const account = await accountService.accountRepository.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.userId,
    });

    // push the account into users accounts field
    loggedInUser.accounts.push(account._id);

    // resave the user
    await loggedInUser.save();

    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

const getAllAccountsController = async (req, res, next) => {
  try {
    const allAccounts =
      await accountService.accountRepository.getAllAccountsAndPopulate(
        req.userId,
        {
          populateOn: "transactions",
        }
      );
    res.json({ status: "success", data: allAccounts });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

const getSingleAccountController = async (req, res, next) => {
  try {
    // find the id from params
    const { id } = req.params;

    // find the account with that acc id
    const accountFound =
      await accountService.accountRepository.getSingleAccountAndPopulate(id, {
        populateOn: "transactions",
      });
    if (!accountFound) {
      return next(new AppErrors("Invalid account id", 404));
    }

    res.json({ status: "success", data: accountFound });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

const deleteAccountController = async (req, res, next) => {
  const { id } = req.params;
  try {
    await accountService.accountRepository.delete(id);
    res.json({ status: "success", data: null });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

const updateAccountController = async (req, res, next) => {
  const updateObj = {};
  const { name, accountType, initialBalance, notes } = req.body;
  let temp = { name, accountType, initialBalance, notes };
  for (const key in temp) {
    if (temp[key]) {
      updateObj[key] = temp[key];
    }
  }
  try {
    const { id } = req.params;
    const account = await accountService.accountRepository.update(
      id,
      updateObj
    );
    res.json({ status: "success", data: account });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

export {
  createAccountController,
  getAllAccountsController,
  getSingleAccountController,
  deleteAccountController,
  updateAccountController,
};
