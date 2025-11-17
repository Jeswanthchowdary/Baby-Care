import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle, AlertTriangle, Heart, Info, Users, XCircle } from "lucide-react";
import { products } from "@/data/products";

export default function ReportCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products[id];

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Contains ingredients that may not be suitable");

  useEffect(() => {
    if (product) {
        const savedProfile = localStorage.getItem("baby-care-profile");
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          const ingredients = product.ingredients.map(i => i.name.toLowerCase());

          const allergyMatch = profile.allergies.find(a => ingredients.includes(a.toLowerCase()));
          if (allergyMatch) {
            setWarningMessage(`Contains an ingredient (${allergyMatch}) that does not match your baby's allergy profile.`);
            return;
          }

          const sensitivityMatch = profile.skinSensitivities.find(s => ingredients.includes(s.toLowerCase()));
           if (sensitivityMatch) {
            setWarningMessage(`Contains an ingredient (${sensitivityMatch}) that may not be suitable for sensitive skin.`);
            return;
          }
        }
    }
  }, [product]);

  // Mock data
  const affiliates = [
    { name: "Honest Company Baby Lotion", brand: "The Honest Company", grade: "A", image: placeholderImage },
    { name: "Aveeno Baby Eczema Therapy", brand: "Aveeno", grade: "A", image: placeholderImage },
    { name: "Burt's Bees Baby Bee", brand: "Burt's Bees", grade: "B", image: placeholderImage },
  ];

  if (!product) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/home')}>Go to Home</Button>
        </div>
    );
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-grade-a";
      case "B":
        return "bg-grade-b";
      case "C":
        return "bg-grade-c";
      case "D":
        return "bg-grade-d";
      case "F":
        return "bg-grade-f";
      default:
        return "bg-muted";
    }
  };

  const getIngredientColor = (status) => {
    switch (status) {
      case "safe":
        return "bg-safe-light text-safe-foreground border-safe";
      case "caution":
        return "bg-warning-light text-warning-foreground border-warning";
      case "avoid":
        return "bg-danger-light text-danger-foreground border-danger";
      default:
        return "bg-muted text-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Report Card</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSaved(!isSaved)}
          className={isSaved ? "text-danger" : ""}
        >
          <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
        </Button>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Product Header */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{product.name}</h2>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>

        {/* Profile Match */}
        <Card
          className={`p-6 border-2 ${
            product.profileMatch
              ? "bg-safe-light border-safe"
              : "bg-danger-light border-danger"
          }`}
        >
          <div className="flex items-center gap-3">
            {product.profileMatch ? (
              <CheckCircle className="w-8 h-8 text-safe flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-danger flex-shrink-0" />
            )}
            <div>
              <h3 className="font-bold text-lg mb-1">
                {product.profileMatch ? "SAFE for your baby!" : "WARNING"}
              </h3>
              <p className="text-sm">
                {product.profileMatch
                  ? "This product matches your baby's profile"
                  : warningMessage}
              </p>
            </div>
          </div>
        </Card>

        {/* Product Score */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Product Score</h3>
            <span className="text-2xl font-bold">{product.score}/100</span>
          </div>
          <Progress value={product.score} className="w-full" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Save to Safe List
            </Button>
            <Button variant="outline">
              <XCircle className="w-4 h-4 mr-2" />
              Add to Avoid List
            </Button>
          </div>
        </Card>

        {/* Ingredients */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Ingredients Breakdown</h3>
          <div className="space-y-2">
            {product.ingredients.map((ingredient, index) => (
              <button
                key={index}
                onClick={() => setSelectedIngredient(ingredient.name)}
                className="w-full"
              >
                <Card
                  className={`p-3 text-left hover:shadow-md transition-shadow border ${getIngredientColor(
                    ingredient.status
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ingredient.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getIngredientColor(ingredient.status)}
                      >
                        {ingredient.status}
                      </Badge>
                      <Info className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Affiliate Products */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-foreground">Safe Alternatives</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsComparing(true)}>
              <Users className="h-4 w-4 mr-2" />
              Compare
            </Button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {affiliates.map((affiliate, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                <div className="bg-muted h-32 flex items-center justify-center">
                  <img src={affiliate.image} alt={affiliate.name} className="h-24 w-24 object-contain"/>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold truncate">{affiliate.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{affiliate.brand}</p>
                  <div className="flex items-center justify-between">
                    <Badge className={getGradeColor(affiliate.grade)}>{affiliate.grade}</Badge>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      <Dialog open={!!selectedIngredient} onOpenChange={() => setSelectedIngredient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedIngredient}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedIngredient && (
              <>
                <Badge
                  className={getIngredientColor(
                    product.ingredients.find((i) => i.name === selectedIngredient)?.status || ""
                  )}
                >
                  {product.ingredients.find((i) => i.name === selectedIngredient)?.status.toUpperCase()}
                </Badge>
                <p className="text-sm text-foreground">
                  {product.ingredients.find((i) => i.name === selectedIngredient)?.description}
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Comparison Modal */}
      <Dialog open={isComparing} onOpenChange={() => setIsComparing(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Compare Products</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">(Current)</p>
                    <Badge className={getGradeColor(product.safetyGrade)}>{product.safetyGrade}</Badge>
                </div>
                {affiliates.slice(0, 1).map((affiliate) => (
                    <div key={affiliate.name}>
                        <p className="font-bold">{affiliate.name}</p>
                        <p className="text-sm text-muted-foreground mb-2">(Alternative)</p>
                        <Badge className={getGradeColor(affiliate.grade)}>{affiliate.grade}</Badge>
                    </div>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
