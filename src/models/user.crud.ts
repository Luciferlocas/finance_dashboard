import { db } from "../config/db";
import { users, type User, type NewUser } from "../config/db/schema";
import { eq } from "drizzle-orm";

export class UserCrud {
  static async createUser(userData: NewUser): Promise<User> {
    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
  }

  static async findUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);
    return user;
  }

  static async findUserById(id: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return user;
  }

  static async getAllUsers(): Promise<User[]> {
    const allUsers = await db.select().from(users);
    return allUsers;
  }

  static async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  static async deleteUser(id: string): Promise<boolean> {
    await db
      .delete(users)
      .where(eq(users.id, id))
    return true;
  }
}
