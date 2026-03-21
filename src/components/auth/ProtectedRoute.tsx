import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
            Verifying Access
          </p>
        </div>
      </div>
    );
  }

  // 1. Not logged in: Redirect to Auth page
  // We save the location they were trying to access in 'state' to redirect them back after login
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. Strict Role Check:
  // Since this is the User-only project, any role that is NOT 'USER' (like ADMIN)
  // should be treated as unauthorized for this specific frontend.
  if (!isUser()) {
    return <Navigate to="/auth" replace />;
  }

  // 3. Authorized: Render the children (Profile, Checkout, etc.)
  return <>{children}</>;
};

export default ProtectedRoute;
