import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Baby, Edit, Scan, List, User } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    allergies: [],
    skinSensitivities: [],
    dietaryGoals: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem("baby-care-profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Profile</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 py-8 space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Baby className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Baby's Profile</h2>
          <p className="text-sm text-muted-foreground">Keep your baby's info up to date</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Allergies</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/onboarding")}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.allergies.length > 0 ? (
              profile.allergies.map((allergy) => (
                <Badge key={allergy} variant="secondary">
                  {allergy}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">None specified</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Skin Type</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/onboarding")}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skinSensitivities.length > 0 ? (
              profile.skinSensitivities.map((skin) => (
                <Badge key={skin} variant="secondary">
                  {skin}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">None specified</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Dietary Goals</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/onboarding")}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.dietaryGoals.length > 0 ? (
              profile.dietaryGoals.map((goal) => (
                <Badge key={goal} variant="secondary">
                  {goal}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">None specified</p>
            )}
          </div>
        </Card>

        <div className="pt-4 space-y-3">
          <Button variant="outline" className="w-full">
            About Baby Care
          </Button>
          <Button variant="outline" className="w-full text-destructive hover:text-destructive">
            Sign Out
          </Button>
        </div>
      </div>

      <nav className="border-t border-border bg-card px-6 py-4">
        <div className="flex justify-around items-center">
          <Link to="/home">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Scan className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link to="/lists">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <List className="h-5 w-5 mb-1" />
              <span className="text-xs">My Lists</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <User className="h-5 w-5 mb-1 text-primary" />
              <span className="text-xs text-primary font-medium">Profile</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
