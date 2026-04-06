import { Request, Response, NextFunction } from 'express';
import { RecordService } from '../services/record.service';

export class RecordController {
  private recordService = new RecordService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = req.query;
      const records = await this.recordService.getRecords(filters);
      res.status(200).json(records);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const record = await this.recordService.createRecord(userId, req.body);
      res.status(201).json({ message: 'Record created successfully', record });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const record = await this.recordService.updateRecord(id, req.body);
      res.status(200).json({ message: 'Record updated successfully', record });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await this.recordService.deleteRecord(id);
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
