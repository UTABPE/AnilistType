import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/templates/PageLayout';
import { MainPage } from './modules/MainPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
