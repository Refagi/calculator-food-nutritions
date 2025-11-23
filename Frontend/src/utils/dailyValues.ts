export const DAILY_VALUES = {
  calories: 2000,      // kcal
  protein: 50,         // g
  carbs: 275,          // g
  fat: 78,             //   
  fiber: 28,           // g
  sugar: 50,           // g
  cholesterol: 300,    // mg
  sodium: 2300,        // mg  
  calcium: 1300,       // mg
  iron: 18,            // mg
  potassium: 4700,     // mg
  magnesium: 420,      // mg  
  vitaminA: 900,       // µg
  vitaminC: 90,        // mg
  vitaminD: 20,        // µg
  vitaminB12: 2.4,     // µg
} as const

export type NutrientKey = keyof typeof DAILY_VALUES