const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenModel = require("../models/token-model");
const tokenService = require("./token-service");

class UserService {
  async registration(name, email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`User with ${email} also exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      status: "unblocked",
    });
    
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} is not registred`);
    }
    const isPasswordEquals = await bcrypt.compare(password, candidate.password);
    if (!isPasswordEquals) {
      throw new Error(`Incorrect password`);
    }

    const userDto = new UserDto(candidate);
    const tokens = tokenService.generateTokens({ ...userDto });
    return { ...tokens, candidate: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("Token Error1");
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenModel.findOne({
        refreshToken: refreshToken,
      });
      if (!tokenFromDb) {
        throw new Error("Token Error2");
      }

      const user = await UserModel.findById(userData.id);
      if (!user) {
        throw new Error("User not found");
      }

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      return { ...tokens, user: userDto };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async removeUser(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }

    const deletedUser = await UserModel.deleteOne({ email: candidate.email })
      .then(() => {
        console.log("User was succesfully deleted");
        return deletedUser;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async blockUser(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }

    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        status: "blocked",
      },
    };
    const options = { upsert: true };
    const blockedUser = await UserModel.updateOne(filter, updateDoc, options);
    const token = await tokenModel.deleteOne({ user: candidate._id });
    return { token, blockedUser };
  }

  async unblockUser(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }

    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        status: "unblocked",
      },
    };
    const options = { upsert: true };
    const unblockedUser = await UserModel.updateOne(filter, updateDoc, options);
    return unblockedUser;
  }

  async addAdmin(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }
    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        isAdmin: true,
      },
    };
    const options = { upsert: true };
    const adminUser = await UserModel.updateOne(filter, updateDoc, options);
    return adminUser;
  }

  async removeAdmin(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }
    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        isAdmin: false,
      },
    };
    const options = { upsert: true };
    const user = await UserModel.updateOne(filter, updateDoc, options);
    return user;
  }

  async isAdmin(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }
    const checkAdmin = candidate.isAdmin
    return checkAdmin
  }
}

module.exports = new UserService();
