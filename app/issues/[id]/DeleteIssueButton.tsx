'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure that you want to delete this issue? This action can not
          be undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
export default DeleteIssueButton;
