import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, X, Scan, List, User } from "lucide-react";

export default function Lists() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("safe");

  const safeProducts = [
    { id: 1, name: "CeraVe Baby Lotion", grade: "A", category: "Lotion" },
    { id: 2, name: "Gerber Organic Puffs", grade: "B", category: "Food" },
  ];

  const avoidProducts = [
    { id: 3, name: "Johnson's Baby Shampoo", grade: "C", category: "Shampoo" },
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
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">My Lists</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="safe">
              <Heart className="h-4 w-4 mr-2" />
              Safe List ({safeProducts.length})
            </TabsTrigger>
            <TabsTrigger value="avoid">
              <X className="h-4 w-4 mr-2" />
              Avoid List ({avoidProducts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safe" className="mt-6 space-y-3">
            {safeProducts.map((product) => (
              <Link to={`/report/${product.id}`} key={product.id}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{product.name}</h4>
                        <Badge className={getGradeColor(product.grade)}>{product.grade}</Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5 text-safe fill-current" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="avoid" className="mt-6 space-y-3">
            {avoidProducts.map((product) => (
              <Link to={`/report/${product.id}`} key={product.id}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{product.name}</h4>
                        <Badge className={getGradeColor(product.grade)}>{product.grade}</Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5 text-danger" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
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
              <List className="h-5 w-5 mb-1 text-primary" />
              <span className="text-xs text-primary font-medium">My Lists</span>
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
