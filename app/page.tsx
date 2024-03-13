import Pagination from './components/Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      pageSize={20}
      itemCount={105}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
