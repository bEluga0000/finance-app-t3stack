// api/users.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = { name: 'Naresh' };
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
