import { Link, useLocation } from 'react-router-dom';

export default function HomeBtn() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <Link
      to="/"
      className="cursor-pointer text-blue-500 hover:text-blue-700  hover:underline transition-all duration-100"
    >
      &#8672; go back home
    </Link>
  );
}
