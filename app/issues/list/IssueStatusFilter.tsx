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
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get('status');
  const changeFilter = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!);
    if (searchParams.get('direction'))
      params.append('direction', searchParams.get('direction')!);
    const query = params.toString();
    router.push(`/issues/list?${query}`);
  };

  return (
    <Flex align="center">
      <Text mr="5">Filter by Issue Type:</Text>
      <Select.Root onValueChange={changeFilter} value={filterStatus || ''}>
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
