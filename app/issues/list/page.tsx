import prisma from '@/prisma/client';
import { Flex, Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from '../../components';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    direction: 'asc' | 'desc';
  };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const { orderBy, direction } = searchParams;
  const issueParams = {
    ...(status && { where: { status: status } }),
    ...(orderBy &&
      (direction === 'asc' || !direction) && { orderBy: { [orderBy]: 'asc' } }),
    ...(orderBy && direction === 'desc' && { orderBy: { [orderBy]: 'desc' } }),
  };
  const issues = await prisma.issue.findMany(issueParams);

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const getArrowVal = (value: keyof Issue) => {
    if (value === orderBy && direction === 'asc') return <ArrowUpIcon />;
    if (value === orderBy && direction === 'desc') return <ArrowDownIcon />;
    return null;
  };

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ className, label, value }) => (
              <Table.ColumnHeaderCell className={className} key={label}>
                <Flex align="center" gap="1">
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: value,
                        direction:
                          orderBy === value && direction === 'asc'
                            ? 'desc'
                            : 'asc',
                      },
                    }}
                  >
                    {label}
                  </NextLink>
                  {getArrowVal(value)}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';
export default IssuesPage;
