import { Link, useLocation } from 'react-router-dom';

export default function HomeBtn() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <Link
      to="/"
      className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <button>Homepage</button>
    </Link>
  );
}
