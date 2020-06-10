interface Args {
  target: number;
  hours: Array<number>;
}
const parseArgs = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , target, ...hours] = args;

  if (!isNaN(Number(target)) && hours.every((item) => !isNaN(Number(item)))) {
    return {
      target: Number(target),
      hours: hours.map((item) => Number(item)),
    };
  }
  throw new Error('Provided values were not numbers!');
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
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
  const average = dailyExerciseHours.reduce((acc, cur) => acc + Number(cur), 0) / periodLength;
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

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (err) {
  console.error('Error, something bad happened, message: ', err.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
}

export default calculateExercises;
