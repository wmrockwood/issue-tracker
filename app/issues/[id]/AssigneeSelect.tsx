'use client';
import { User } from '@prisma/client';
import { Select, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const users = await axios.get("@/app/api/users")

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>('/api/users');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Text>Assign to:</Text>
      <Select.Root>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};
export default AssigneeSelect;
