import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { role } = req.body;
      const user = await this.userService.updateRole(id, role);
      res.status(200).json({ message: 'User role updated', user });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { status } = req.body;
      const user = await this.userService.updateStatus(id, status);
      res.status(200).json({ message: 'User status updated', user });
    } catch (error) {
      next(error);
    }
  };
}
