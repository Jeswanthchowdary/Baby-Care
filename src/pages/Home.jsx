import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Scan, List, User, Clock, Search, Bell } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const recentScans = [
    {
      id: 1,
      name: "Honest Company Baby Lotion",
      grade: "A",
      safe: true,
      time: "2 hours ago",
    },
    {
      id: 2, // This now links to the unsafe product
      name: "Johnson's Baby Powder",
      grade: "F",
      safe: false,
      time: "2 days ago",
    },
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-grade-a text-white";
      case "B":
        return "bg-grade-b text-white";
      case "C":
        return "bg-grade-c text-white";
      case "D":
        return "bg-grade-d text-white";
      case "F":
        return "bg-grade-f text-white";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">Keep your baby safe and healthy</p>
          </div>
           <Link to="/notifications">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          </Link>
        </div>

        <Link to="/scanner" className="block mb-6">
          <Card className="bg-primary text-primary-foreground p-8 text-center border-none shadow-lg">
            <Scan className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Scan a Product</h2>
            <p className="text-sm opacity-90">Tap to scan any baby product barcode</p>
          </Card>
        </Link>

        <div className="mb-8">
          <p className="text-center text-sm text-muted-foreground mb-3">
            Or search for a product manually
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., 'Pampers Swaddlers'"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('/report/1');
              }}
            />
            <Button onClick={() => navigate('/report/1')} aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Recent Scans</h3>
            <Link to="/lists">
              <Button variant="ghost" size="sm">
                <List className="h-4 w-4 mr-2" />
                My Lists
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentScans.map((scan) => (
              <Link to={`/report/${scan.id}`} key={scan.id}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{scan.name}</h4>
                        <Badge className={getGradeColor(scan.grade)}>{scan.grade}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={scan.safe ? "outline" : "destructive"}
                          className={
                            scan.safe
                              ? "bg-safe-light text-safe-foreground border-safe"
                              : ""
                          }
                        >
                          {scan.safe ? "✓ Safe" : "⚠ Warning"}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {scan.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <nav className="border-t border-border bg-card px-6 py-4">
        <div className="flex justify-around items-center">
          <Link to="/home">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Scan className="h-5 w-5 mb-1 text-primary" />
              <span className="text-xs text-primary font-medium">Home</span>
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
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
