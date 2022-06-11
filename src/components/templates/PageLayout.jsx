import { Outlet } from 'react-router-dom';
import { PageHeader } from '../organisms/PageHeader.jsx';
export const PageLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <PageHeader />
      <div className="pt-[60px]">
        <Outlet />
      </div>
    </div>
  );
};
