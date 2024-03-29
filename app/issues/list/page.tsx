import prisma from '@/prisma/client';

import IssueActions from './IssueActions';
import { Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';
import IssueTable, { SearchParams } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

const IssuesPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const { orderBy, direction } = searchParams;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issueParams = {
    ...(status && { where }),
    ...(orderBy &&
      (direction === 'asc' || !direction) && { orderBy: { [orderBy]: 'asc' } }),
    ...(orderBy && direction === 'desc' && { orderBy: { [orderBy]: 'desc' } }),
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: true,
    },
  };

  const issues = await prisma.issue.findMany(issueParams);
  const totalIssues = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={totalIssues}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue list',
  description: 'View all project issues',
};

export default IssuesPage;
