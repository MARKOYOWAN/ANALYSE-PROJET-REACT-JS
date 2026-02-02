import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/Home/page/HomePage"; 
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;