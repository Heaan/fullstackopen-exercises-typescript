interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: Array<number>, target: number) => {
  const rankSelection = (averageOfDaily: number) => {
    if (averageOfDaily < 0.5) {
      return { rating: 1, ratingDescription: 'too bad, should work harder' };
    }
    if (averageOfDaily >= 0.5 && averageOfDaily < 2) {
      return { rating: 2, ratingDescription: 'not too bad but could be better' };
    }
    return { rating: 3, ratingDescription: 'great! keep it up' };
  };

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((day) => day).length;
  const average = dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const { rating, ratingDescription } = rankSelection(average);
  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
