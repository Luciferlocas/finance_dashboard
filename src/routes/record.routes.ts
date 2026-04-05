import { Router } from "express";
import { RecordController } from "../controllers/record.controller";
import { authenticate, authorize } from "../middleware";

const router = Router();

router.use(authenticate);

router.post("/", authorize(["ADMIN"]), RecordController.createRecord);
router.get("/", authorize(["ANALYST", "ADMIN"]), RecordController.getRecords);
router.get("/:id", authorize(["ANALYST", "ADMIN"]), RecordController.getRecordById);
router.put("/:id", authorize(["ADMIN"]), RecordController.updateRecord);
router.delete("/:id", authorize(["ADMIN"]), RecordController.deleteRecord);

export default router;
