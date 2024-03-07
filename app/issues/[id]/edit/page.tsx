import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
