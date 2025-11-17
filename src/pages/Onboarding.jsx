import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Baby, Plus } from "lucide-react";

const STEPS = 3;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("baby-care-profile");
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      allergies: [],
      skinSensitivities: [],
      dietaryGoals: [],
    };
  });
  const [customInputs, setCustomInputs] = useState({
    allergy: "",
    skin: "",
    diet: "",
  });

  const [onboardingOptions, setOnboardingOptions] = useState({
    allergies: ["Peanut", "Dairy", "Soy", "Gluten", "Eggs", "Tree Nuts", "Shellfish", "Sesame"],
    skinSensitivities: ["Eczema-Prone", "Sensitive Skin", "Dry Skin", "Normal Skin"],
    dietaryGoals: ["Low Sugar", "Organic", "No Artificial Dyes", "No Preservatives", "Whole Foods"],
  });

  const toggleItem = (category, item) => {
    setProfile((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const addCustomItem = (category, inputKey) => {
    const value = customInputs[inputKey].trim();
    if (value && !profile[category].includes(value)) {
      // Add to selected profile
      setProfile((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
      // Add to the list of options
      setOnboardingOptions((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
      // Clear input
      setCustomInputs((prev) => ({ ...prev, [inputKey]: "" }));
    }
  };

  const handleContinue = () => {
    if (step < STEPS) {
      setStep(step + 1);
    } else {
      localStorage.setItem("baby-care-profile", JSON.stringify(profile));
      navigate("/home");
    }
  };

  const progress = (step / STEPS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-light to-background flex flex-col">
      <div className="flex-1 flex flex-col px-5 py-6 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 mt-4">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-3 shadow-lg">
            <Baby className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-center text-foreground">Welcome to Baby Care</h1>
          <p className="text-center text-muted-foreground text-sm mt-1">
            Personalize your baby's safety profile
          </p>
        </div>

        <Progress value={progress} className="mb-6 h-1.5" />

        {/* Step Content */}
        <div className="flex-1 pb-4">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Any allergies to watch for?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all that apply or add your own
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {onboardingOptions.allergies.map((allergy) => (
                  <Card
                    key={allergy}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      profile.allergies.includes(allergy)
                        ? "border-primary bg-royal-light shadow-sm"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                    onClick={() => toggleItem("allergies", allergy)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={profile.allergies.includes(allergy)} className="border-primary data-[state=checked]:bg-primary" />
                      <label className="text-sm font-medium cursor-pointer leading-tight">{allergy}</label>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground mb-2 block">Add Custom Allergy</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Fish, Corn"
                    value={customInputs.allergy}
                    onChange={(e) => setCustomInputs({ ...customInputs, allergy: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && addCustomItem("allergies", "allergy")}
                    className="flex-1 bg-card border-border"
                  />
                  <Button
                    size="icon"
                    onClick={() => addCustomItem("allergies", "allergy")}
                    className="shrink-0 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  What's your baby's skin type?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  This helps us check product ingredients
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {onboardingOptions.skinSensitivities.map((skin) => (
                  <Card
                    key={skin}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      profile.skinSensitivities.includes(skin)
                        ? "border-primary bg-royal-light shadow-sm"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                    onClick={() => toggleItem("skinSensitivities", skin)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={profile.skinSensitivities.includes(skin)} className="border-primary data-[state=checked]:bg-primary" />
                      <label className="text-sm font-medium cursor-pointer leading-tight">{skin}</label>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground mb-2 block">Add Custom Concern</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Rosacea, Acne-Prone"
                    value={customInputs.skin}
                    onChange={(e) => setCustomInputs({ ...customInputs, skin: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && addCustomItem("skinSensitivities", "skin")}
                    className="flex-1 bg-card border-border"
                  />
                  <Button
                    size="icon"
                    onClick={() => addCustomItem("skinSensitivities", "skin")}
                    className="shrink-0 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Your dietary preferences?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  For baby food and snacks analysis
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {onboardingOptions.dietaryGoals.map((goal) => (
                  <Card
                    key={goal}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      profile.dietaryGoals.includes(goal)
                        ? "border-primary bg-royal-light shadow-sm"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                    onClick={() => toggleItem("dietaryGoals", goal)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={profile.dietaryGoals.includes(goal)} className="border-primary data-[state=checked]:bg-primary" />
                      <label className="text-sm font-medium cursor-pointer leading-tight">{goal}</label>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground mb-2 block">Add Custom Goal</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Non-GMO, Vegan"
                    value={customInputs.diet}
                    onChange={(e) => setCustomInputs({ ...customInputs, diet: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && addCustomItem("dietaryGoals", "diet")}
                    className="flex-1 bg-card border-border"
                  />
                  <Button
                    size="icon"
                    onClick={() => addCustomItem("dietaryGoals", "diet")}
                    className="shrink-0 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue} 
          size="lg" 
          className="w-full mt-4 bg-primary hover:bg-primary/90 shadow-md h-12 text-base font-semibold"
        >
          {step === STEPS ? "Get Started" : "Continue"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Step Indicator */}
        <div className="flex justify-center gap-1.5 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
