
import placeholderImage from "@/assets/placeholder.svg";

export const products = {
  "1": {
    id: 1,
    name: "Honest Company Baby Lotion",
    brand: "The Honest Company",
    category: "Baby Lotion",
    image: placeholderImage,
    safetyGrade: "A",
    score: 92,
    nutritionGrade: null,
    profileMatch: true,
    ingredients: [
      { name: "Aqua", status: "safe", description: "Water - the base of most lotions" },
      { name: "Glycerin", status: "safe", description: "A safe, plant-based moisturizer that's good for skin" },
      { name: "Cetearyl Alcohol", status: "safe", description: "A fatty alcohol that helps moisturize and soften skin" },
    ],
  },
  "2": {
    id: 2,
    name: "Johnson's Baby Powder",
    brand: "Johnson & Johnson",
    category: "Baby Powder",
    image: placeholderImage,
    safetyGrade: "F",
    score: 18,
    nutritionGrade: null,
    profileMatch: false,
    ingredients: [
        { name: "Talc", status: "avoid", description: "May contain asbestos, a known carcinogen." },
        { name: "Fragrance", status: "avoid", description: "A common allergen and can hide harmful chemicals." },
    ],
  },
};
