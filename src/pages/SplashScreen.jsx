import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500); // Navigate after 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center animate-pulse">
        <Baby className="w-24 h-24 text-primary" />
        <h1 className="text-3xl font-bold text-foreground mt-4">Baby Care</h1>
      </div>
    </div>
  );
}
