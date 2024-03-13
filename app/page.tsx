import Pagination from './components/Pagination';

export default function Home() {
  return <Pagination pageSize={20} itemCount={105} currentPage={1} />;
}
