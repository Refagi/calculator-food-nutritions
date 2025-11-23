import { DAILY_VALUES, type NutrientKey } from './dailyValues';

export const calculateDV = (nutrient: NutrientKey, value: number): null | number => {
  const dailyValue = DAILY_VALUES[nutrient];
  if(!dailyValue || value === 0) {
    return null
  }

  return Math.round((value / dailyValue) * 100)
}

export const formatDV = (nutrient: NutrientKey, value: number) => {
  const dv = calculateDV(nutrient, value);
  if(!dv) {
    return '';
  }
  return `${dv}%`
}

export const getCategoryDV = (presents: number): string => {
  if(presents <= 5) return 'Low';
  if(presents >= 20) return 'Hight';
  return 'Medium';
}