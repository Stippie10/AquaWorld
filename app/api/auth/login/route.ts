import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, createToken, hashPassword } from '@/lib/auth';
import { getUsers, saveUsers } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Gebruikersnaam en wachtwoord zijn verplicht' },
        { status: 400 }
      );
    }

    const usersData = getUsers();
    const user = usersData.users.find((u: any) => u.username === username);

    if (!user) {
      return NextResponse.json(
        { error: 'Ongeldige inloggegevens' },
        { status: 401 }
      );
    }

    // First time setup - if password is not set, use the provided password
    if (!user.passwordHash || user.passwordHash.startsWith('$2a$10$YIjlr')) {
      const hashedPassword = await hashPassword(password);
      user.passwordHash = hashedPassword;
      saveUsers(usersData);
    } else {
      const isValid = await comparePassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Ongeldige inloggegevens' },
          { status: 401 }
        );
      }
    }

    const token = createToken(user.id);

    return NextResponse.json(
      { 
        success: true,
        token,
        user: { id: user.id, username: user.username, role: user.role }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Inloggen mislukt' },
      { status: 500 }
    );
  }
}
