import bcrypt from "bcrypt";
import { UserCrud } from "../models";
import { UserLoginInput, UserRegistrationInput, UpdateRoleInput, RemoveUserInput, UpdateStatusInput } from "../schema";
import { createJWT } from "../helpers/auth/jwt";

export class AuthService {
  static async register(userDetails: UserRegistrationInput) {
    try {
      const { email, password } = userDetails;

      const existing = await UserCrud.findUserByEmail(email);
      if (existing) throw new Error("User already exists");

      userDetails.password = await bcrypt.hash(password, 10);
      const newUser = await UserCrud.createUser(userDetails);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async login(loginInfo: UserLoginInput) {
    const { email, password } = loginInfo;
    try {
      const user = await UserCrud.findUserByEmail(email);
      if (!user) {
        throw new Error("Wrong email or password");
      }

      if (user.status === "INACTIVE") {
        throw new Error("Account is inactive");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Wrong email or password");
      }

      const token = createJWT({
        id: user.id,
        role: user.role,
        name: user.name,
      });

      return {
        message: "Login successful",
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const users = await UserCrud.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async updateRole(updateInfo: UpdateRoleInput) {
    try {
      const { id, role } = updateInfo;
      const user = await UserCrud.findUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedUser = await UserCrud.updateUser(id, { role });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(updateInfo: UpdateStatusInput) {
    try {
      const { id, status } = updateInfo;
      const user = await UserCrud.findUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedUser = await UserCrud.updateUser(id, { status });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async removeUser(removeInfo: RemoveUserInput) {
    try {
      const { id } = removeInfo;
      const user = await UserCrud.findUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const removedUser = await UserCrud.deleteUser(id);
      return removedUser;
    } catch (error) {
      throw error;
    }
  }
}
