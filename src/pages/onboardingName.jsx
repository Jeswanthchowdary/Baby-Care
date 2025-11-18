import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Baby, ArrowRight } from "lucide-react";

export default function OnboardingName() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleContinue = () => {
    if (name.trim() && age.trim()) {
      const existingProfile = JSON.parse(localStorage.getItem("baby-care-profile")) || {};
      const newProfile = {
        ...existingProfile,
        babyName: name.trim(),
        babyAge: age.trim(),
      };
      localStorage.setItem("baby-care-profile", JSON.stringify(newProfile));
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-light to-background flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <Baby className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Tell us about your baby</h1>
          <p className="text-muted-foreground">This will help us personalize your experience.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="babyName" className="block text-sm font-medium text-foreground mb-2">
              Baby's Name
            </label>
            <Input
              id="babyName"
              type="text"
              placeholder="e.g., Leo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <label htmlFor="babyAge" className="block text-sm font-medium text-foreground mb-2">
              Baby's Age (in months)
            </label>
            <Input
              id="babyAge"
              type="number"
              placeholder="e.g., 6"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full mt-10 h-12 text-base font-semibold"
          disabled={!name.trim() || !age.trim()}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Card>
    </div>
  );
}
