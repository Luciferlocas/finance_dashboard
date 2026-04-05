import { db } from "../config/db";
import { records, type Record, type NewRecord } from "../config/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export class RecordCrud {
  static async createRecord(recordData: NewRecord): Promise<Record> {
    const [newRecord] = await db.insert(records).values(recordData).returning();
    return newRecord;
  }

  static async getRecordById(id: string): Promise<Record | undefined> {
    const [record] = await db
      .select()
      .from(records)
      .where(eq(records.id, id))
      .limit(1);
    return record;
  }

  static async getRecords({
    userId,
    startDate,
    endDate,
    type,
    category
  }: {
    userId: string;
    startDate?: Date;
    endDate?: Date;
    type?: "INCOME" | "EXPENSE";
    category?: string;
  }): Promise<Record[]> {
    const conditions = [eq(records.userId, userId)];
    
    if (startDate) conditions.push(gte(records.date, startDate));
    if (endDate) conditions.push(lte(records.date, endDate));
    if (type) conditions.push(eq(records.type, type));
    if (category) conditions.push(eq(records.category, category));

    return await db
      .select()
      .from(records)
      .where(and(...conditions));
  }

  static async updateRecord(id: string, updateData: Partial<Record>): Promise<Record> {
    const [updatedRecord] = await db
      .update(records)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(records.id, id))
      .returning();
    return updatedRecord;
  }

  static async deleteRecord(id: string): Promise<boolean> {
    await db
      .delete(records)
      .where(eq(records.id, id));
    return true;
  }
}
