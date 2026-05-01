import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="relative">
          <h1 className="text-[10rem] font-black text-primary/10 leading-none select-none">404</h1>
          <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-foreground">
            Page Not Found
          </p>
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20">
          <Link to="/">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
