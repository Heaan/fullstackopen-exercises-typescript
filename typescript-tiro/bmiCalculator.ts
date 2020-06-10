interface ArgsBmi {
  height: number;
  weight: number;
}

const parseArgv = (args: Array<string>): ArgsBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
  throw new Error('Provided values were not numbers!');
};

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

try {
  const { height, weight } = parseArgv(process.argv);
  console.log(calculateBmi(height, weight));
} catch (err) {
  console.error('Error, something bad happened, message: ', err.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
}

export default calculateBmi;
