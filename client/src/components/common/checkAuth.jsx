import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children, isLoading }) => {

    const location = useLocation();


    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />;
        } else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/shop/home" />;
            }
        }
    }

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    if (
        isAuthenticated &&
        (location.pathname.includes("/login") || location.pathname.includes("/register"))

    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }
    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("/shop")
    ) {
        return <Navigate to="/admin/dashboard" />;
    }
    if (
        isAuthenticated &&
        user?.role === "user" &&
        location.pathname.includes("/admin")
    ) {
        return <Navigate to="/shop/home" />;
    }
    return <>{children}</>

};

export default CheckAuth;