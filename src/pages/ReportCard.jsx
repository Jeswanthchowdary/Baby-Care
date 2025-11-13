import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle, AlertTriangle, Heart, Info } from "lucide-react";

export default function ReportCard() {
  const navigate = useNavigate();
  useParams(); // Keep this to avoid breaking the app if the route expects a param, but the variable is unused.
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Mock data
  const GLOBAL_IMAGE_LINK = "https://example.com/images/";

  const affiliates = [
    { name: "Honest Company Baby Lotion", brand: "The Honest Company", grade: "A", image: `${GLOBAL_IMAGE_LINK}honest-lotion.png` },
    { name: "Aveeno Baby Eczema Therapy", brand: "Aveeno", grade: "A", image: `${GLOBAL_IMAGE_LINK}aveeno-eczema.png` },
    { name: "Burt's Bees Baby Bee", brand: "Burt's Bees", grade: "B", image: `${GLOBAL_IMAGE_LINK}burts-bees-lotion.png` },
  ];

  const product = {
    name: "CeraVe Baby Lotion",
    brand: "CeraVe",
    category: "Baby Lotion",
    image: `${GLOBAL_IMAGE_LINK}cerave-baby.png`,
    safetyGrade: "A",
    nutritionGrade: null,
    profileMatch: true,
    warnings: [],
    ingredients: [
      { name: "Aqua", status: "safe", description: "Water - the base of most lotions" },
      {
        name: "Glycerin",
        status: "safe",
        description: "A safe, plant-based moisturizer that's good for skin",
      },
      {
        name: "Cetearyl Alcohol",
        status: "safe",
        description: "A fatty alcohol that helps moisturize and soften skin",
      },
      {
        name: "Phenoxyethanol",
        status: "caution",
        description: "A preservative. Generally safe in small amounts, but may irritate sensitive skin",
      },
    ],
  };

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
        return "bg-safe-light text-safe border-safe";
      case "caution":
        return "bg-warning-light text-warning border-warning";
      case "avoid":
        return "bg-danger-light text-danger border-danger";
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
                  : "Contains ingredients that may not be suitable"}
              </p>
            </div>
          </div>
        </Card>

        {/* Grades */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2 uppercase">Safety Score</p>
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white ${getGradeColor(
                product.safetyGrade
              )}`}
            >
              {product.safetyGrade}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Excellent</p>
          </Card>
          {product.nutritionGrade && (
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2 uppercase">Nutrition Score</p>
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white ${getGradeColor(
                  product.nutritionGrade
                )}`}
              >
                {product.nutritionGrade}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Very Good</p>
            </Card>
          )}
        </div>

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
                    <Info className="h-4 w-4 flex-shrink-0" />
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Affiliate Products */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Safe Alternatives</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {affiliates.map((affiliate, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
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
    </div>
  );
}
