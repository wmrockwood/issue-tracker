import { IssueStatusBadge } from '@/app/components';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';
import { Issue } from '@prisma/client';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};
export default IssueDetails;
