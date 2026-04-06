import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';

export class AuthService {
  private userRepository = new UserRepository();
  private SALT_ROUNDS = 10;

  async register(email: string, passwordRaw: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      const err: any = new Error('Email already in use');
      err.status = 400;
      throw err;
    }

    const passwordHash = await bcrypt.hash(passwordRaw, this.SALT_ROUNDS);
    
    // First user gets ADMIN role? The requirements say Viewer default, we'll keep Viewer default unless it's empty maybe. Let's just make everyone VIEWER by default as per schema.
    const user = await this.userRepository.create({
      email,
      passwordHash,
      role: 'VIEWER', // Explicitly setting it, though schema defaults it
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async login(email: string, passwordRaw: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const err: any = new Error('Invalid email or password');
      err.status = 401;
      throw err;
    }

    const isValid = await bcrypt.compare(passwordRaw, user.passwordHash);
    if (!isValid) {
      const err: any = new Error('Invalid email or password');
      err.status = 401;
      throw err;
    }

    if (user.status !== 'ACTIVE') {
      const err: any = new Error('Account inactive');
      err.status = 403;
      throw err;
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      secret,
      { expiresIn: '1d' }
    );

    return { token, role: user.role };
  }
}
