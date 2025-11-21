export interface DetailsNutritions {
  id: string;
  foodId: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  cholesterol: number;
  sodium: number;
  calcium: number;
  iron: number;
  potassium: number;
  magnesium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminB12: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionResult {
  name: string;
  image_url: string;
  portion: string;
  ingredients: string[]
  details: DetailsNutritions
}

export interface PropsNotification {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning';
}
