import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full bg-red-950/20 p-8 border border-white/10 card-3d rounded-none backdrop-blur-sm">
        <div className="w-20 h-20 bg-primary/20 rounded-none border border-primary/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-2 text-6xl font-bold text-white">404</h1>
        <p className="mb-6 text-xl text-gray-300">Oops! Page not found</p>
        <p className="mb-8 text-gray-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="w-full bg-primary text-black hover:bg-primary/90 rounded-none btn-3d font-bold">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
