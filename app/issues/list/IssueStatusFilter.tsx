'use client';
import { Flex, Select, Text } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value: Status | '' }[] = [
  { label: 'All', value: '' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const status = useSearchParams().get('status');
  const changeFilter = (status: string) => {
    const query = status ? `?status=${status}` : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Flex align="center">
      <Text mr="5">Filter by Issue Type:</Text>
      <Select.Root onValueChange={changeFilter} value={status || ''}>
        <Select.Trigger />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || ''}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
export default IssueStatusFilter;
