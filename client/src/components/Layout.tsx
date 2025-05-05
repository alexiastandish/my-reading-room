import { Outlet } from 'react-router-dom';
import HomeBtn from '@/components/HomeBtn';

export default function Layout() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <HomeBtn />
      <Outlet />
    </div>
  );
}
