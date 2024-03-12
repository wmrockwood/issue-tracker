import { patchIssueSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { title, description, assignedToUserId } = body;
  const validation = patchIssueSchema.safeParse(body);
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: 'invalid user' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const id = parseInt(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });
  if (!session) return NextResponse.json({}, { status: 401 });
  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  await prisma.issue.delete({
    where: { id: id },
  });

  return NextResponse.json({});
}
