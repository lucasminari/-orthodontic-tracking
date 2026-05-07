import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    id: itemId,
    status: body.status || 'resolved',
    resolvedBy: body.resolvedBy || 'user',
    resolvedAt: new Date().toISOString(),
  });
}
