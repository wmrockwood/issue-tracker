import { IssueStatusBadge } from '@/app/components';
import { Prisma } from '@prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Avatar, Flex, Link, Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export type SearchParams = {
  status: Status;
  orderBy: keyof Issue;
  direction: 'asc' | 'desc';
  page: string;
};

const issuesWithUser = Prisma.validator<Prisma.IssueDefaultArgs>()({
  include: { assignedToUser: true },
});

type IssuesWithUser = Prisma.IssueGetPayload<typeof issuesWithUser>;

interface Props {
  searchParams: SearchParams;
  issues: IssuesWithUser[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const { orderBy, direction } = searchParams;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'Assigned To',
      value: 'assignedToUserId',
      className: 'hidden md:table-cell',
    },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const getArrowVal = (value: keyof Issue) => {
    if (value === orderBy && direction === 'asc') return <ArrowUpIcon />;
    if (value === orderBy && direction === 'desc') return <ArrowDownIcon />;
    return null;
  };

  return (
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
              {issue.assignedToUser ? (
                <Flex gap="3" align="center">
                  {issue.assignedToUser && issue.assignedToUser.name}
                  {
                    <Avatar
                      src={issue.assignedToUser.image || undefined}
                      fallback="?"
                      size="1"
                      radius="full"
                    />
                  }
                </Flex>
              ) : (
                'Unassigned'
              )}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default IssueTable;
