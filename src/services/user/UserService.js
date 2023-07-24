import { UserRepository } from "../../repositories/index.js";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../../config/serverConfig.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async hashPassword(password) {
    try {
      // hash password
      const salt = await bcrypt.genSalt(+SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error(`Something went wrong at user service layer: ${error}`);
      throw error;
    }
  }

  async registerUser(data) {
    try {
      const hashedPassword = await this.hashPassword(data.password);
      const user = await this.userRepository.create({
        ...data,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      console.error(`Something went wrong at user service layer: ${error}`);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      console.error(`Something went wrong at user service layer: ${error}`);
      throw error;
    }
  }

  async comparePassword(password, dbPassword) {
    try {
      // check for password validity
      const isPasswordmatch = await bcrypt.compare(password, dbPassword);
      return isPasswordmatch;
    } catch (error) {
      console.error(`Something went wrong at user service layer: ${error}`);
      throw error;
    }
  }
}

export default UserService;
