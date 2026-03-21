import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-env';

// Maak hash van wachtwoord
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Vergelijk wachtwoord
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Maak JWT token
export function createToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Verifieer JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Verificeer request
export function verifyAuth(token: string | undefined): { valid: boolean; userId?: string } {
  if (!token) return { valid: false };
  const decoded = verifyToken(token);
  if (!decoded) return { valid: false };
  return { valid: true, userId: decoded.userId };
}
