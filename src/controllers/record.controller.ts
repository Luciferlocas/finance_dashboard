import { Request, Response } from "express";
import { RecordCreateSchema, RecordUpdateSchema, RecordQuerySchema } from "../schema";
import { RecordService } from "../services";

export class RecordController {
  static async createRecord(req: Request, res: Response) {
    const validationResult = RecordCreateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    try {
      const newRecord = await RecordService.createRecord(req.user.id, validationResult.data);
      return res.status(201).json(newRecord);
    } catch (err: any) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  static async getRecords(req: Request, res: Response) {
    const validationResult = RecordQuerySchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    try {
      const records = await RecordService.getRecords(req.user.id, validationResult.data);
      return res.status(200).json(records);
    } catch (err: any) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  static async getRecordById(req: Request, res: Response) {
    try {
      const record = await RecordService.getRecordById(req.params.id, req.user.id);
      return res.status(200).json(record);
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }

  static async updateRecord(req: Request, res: Response) {
    const validationResult = RecordUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    try {
      const updatedRecord = await RecordService.updateRecord(
        req.params.id,
        req.user.id,
        validationResult.data
      );
      return res.status(200).json(updatedRecord);
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }

  static async deleteRecord(req: Request, res: Response) {
    try {
      await RecordService.deleteRecord(req.params.id, req.user.id);
      return res.status(200).json({ message: "Record deleted successfully" });
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }
}
