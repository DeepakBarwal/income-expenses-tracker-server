import { UserService } from "../../services/index.js";
import AppErrors from "../../utils/AppErrors.js";
import generateToken from "../../utils/generateToken.js";

const userService = new UserService();

// Register
const registerUserController = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  // check if fields are empty
  if (!email || !password || !fullname) {
    return next(new AppErrors("Please provide all the fields", 400));
  }

  try {
    // check if email exists
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      return next(new AppErrors("User already exists", 400));
    }

    // hash password
    const user = await userService.registerUser({ fullname, email, password });
    res.json({
      status: "success",
      fullname: user.fullname,
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

// Login
const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  // check if fields are empty
  if (!email || !password) {
    return next(new AppErrors("Please provide all the fields", 400));
  }
  try {
    // check if email exists
    const userFound = await userService.findByEmail(email.toLowerCase());
    if (!userFound) {
      return next(new AppErrors("Invalid login credentials", 400));
    }

    // check for password validity
    const isPasswordmatch = await userService.comparePassword(
      password,
      userFound.password
    );

    if (!isPasswordmatch) {
      return next(new AppErrors("Invalid login credentials", 400));
    }

    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

// Profile
const userProfileController = async (req, res, next) => {
  try {
    const user = await userService.userRepository.getAllUsersAndPopulate(
      req.userId
    );
    if (!user) {
      return next(new AppErrors("Token expired, please login again", 401));
    }
    res.json({ status: "success", data: user });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

// Delete
const deleteUserController = async (req, res, next) => {
  try {
    await userService.userRepository.delete(req.userId);
    res.json({ status: "success", data: null });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

// Update
const updateUserController = async (req, res, next) => {
  const updateObj = {};

  if (req.body?.fullname) {
    updateObj.fullname = req.body.fullname;
  }

  if (req.body?.email) {
    updateObj.email = req.body.email;
  }
  if (req.body?.password) {
    updateObj.password = req.body.password;
  }

  try {
    // check if email already exists and if user is updating it
    if (req.body?.email) {
      const userFound = await userService.findByEmail(req.body.email);
      if (userFound) {
        return next(new AppErrors("Email is taken", 400));
      }
    }

    // check if user is updating password
    if (req.body?.password) {
      const hashedPassword = await userService.hashPassword(req.body.password);
      updateObj.password = hashedPassword;
    }

    // update the user
    const updatedUser = await userService.userRepository.update(
      req.userId,
      updateObj
    );

    res.json({ status: "success", data: updatedUser });
  } catch (error) {
    next(new AppErrors(error.message, 400));
  }
};

export {
  registerUserController,
  loginUserController,
  userProfileController,
  deleteUserController,
  updateUserController,
};
