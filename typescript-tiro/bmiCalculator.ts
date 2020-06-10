const calculateBmi = (height: number, weight: number): string => {
  const result = weight / (height / 100) ** 2;

  if (result < 15) return 'Very severely underweight';
  if (result >= 15 && result < 16) return 'Severely underweight';
  if (result >= 16 && result < 18.5) return 'Underweight';
  if (result >= 18.5 && result < 25) return 'Normal (healthy weight)';
  if (result >= 25 && result < 30) return 'Overweight';
  if (result >= 30 && result < 35) return 'Obese Class I (Moderately obese)';
  if (result >= 35 && result < 40) return 'Obese Class II (Severely obese)';
  return 'Obese Class III (Very severely obese)';
};

console.log(calculateBmi(180, 74));
