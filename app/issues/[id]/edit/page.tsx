import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/client';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  if (isNaN(parseInt(id))) notFound();
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};
export default EditIssuePage;
