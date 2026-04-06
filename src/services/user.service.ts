import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository = new UserRepository();

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async updateRole(id: string, role: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      const err: any = new Error('User not found');
      err.status = 404;
      throw err;
    }
    return this.userRepository.updateRole(id, role);
  }

  async updateStatus(id: string, status: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      const err: any = new Error('User not found');
      err.status = 404;
      throw err;
    }
    return this.userRepository.updateStatus(id, status);
  }
}
