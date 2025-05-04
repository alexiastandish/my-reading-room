import { Outlet } from 'react-router-dom';
import HomeBtn from '@/components/HomeBtn';

export default function Layout() {
  return (
    <div>
      <HomeBtn />
      <Outlet />
    </div>
  );
}
