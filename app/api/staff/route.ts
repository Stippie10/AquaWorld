import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getStaff, saveStaff } from '@/lib/data';

export async function GET() {
  try {
    const staff = getStaff();
    return NextResponse.json(staff, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Staff data ophalen mislukt' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const auth = verifyAuth(token);

    if (!auth.valid) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      );
    }

    const { serverIp, team } = await req.json();
    const staffData = getStaff();

    if (serverIp !== undefined) staffData.serverIp = serverIp;
    if (team !== undefined) staffData.team = team;

    saveStaff(staffData);

    return NextResponse.json(staffData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Staff data updaten mislukt' },
      { status: 500 }
    );
  }
}
