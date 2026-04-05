import { z } from "zod";

export const RecordCreateSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Category is required"),
  notes: z.string().optional(),
  date: z.string().datetime().optional()
});

export const RecordUpdateSchema = RecordCreateSchema.partial();

export const RecordQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  category: z.string().optional()
});

export type RecordCreateInput = z.infer<typeof RecordCreateSchema>;
export type RecordUpdateInput = z.infer<typeof RecordUpdateSchema>;
export type RecordQueryInput = z.infer<typeof RecordQuerySchema>;
