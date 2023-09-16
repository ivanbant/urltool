import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useContext(UserContext);
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
