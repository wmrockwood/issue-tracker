'use client';
import { Issue, User } from '@prisma/client';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@/app/components';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Text>Assign to:</Text>
      <Select.Root
        onValueChange={async (userId: string) => {
          try {
            await axios.patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId || null,
            });
          } catch (error) {
            toast.error('Changes could not be saved');
          }
        }}
        defaultValue={issue.assignedToUserId || ''}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
export default AssigneeSelect;
