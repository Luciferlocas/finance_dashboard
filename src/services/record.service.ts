import { RecordCrud } from "../models";
import { RecordCreateInput, RecordUpdateInput, RecordQueryInput } from "../schema";

export class RecordService {
  static async createRecord(userId: string, data: RecordCreateInput) {
    return await RecordCrud.createRecord({
      amount: data.amount,
      type: data.type,
      category: data.category,
      notes: data.notes || null,
      userId,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  static async getRecords(userId: string, query: RecordQueryInput) {
    return await RecordCrud.getRecords({
      userId,
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      type: query.type,
      category: query.category,
    });
  }

  static async getRecordById(id: string, userId: string) {
    const record = await RecordCrud.getRecordById(id);
    if (!record || record.userId !== userId) {
      throw new Error("Record not found or unauthorized");
    }
    return record;
  }

  static async updateRecord(id: string, userId: string, data: RecordUpdateInput) {
    await this.getRecordById(id, userId);

    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date);
    
    return await RecordCrud.updateRecord(id, updateData);
  }

  static async deleteRecord(id: string, userId: string) {
    await this.getRecordById(id, userId);
    return await RecordCrud.deleteRecord(id);
  }
}
