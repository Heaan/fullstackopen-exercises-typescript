import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

interface Body {
  daily_exercises: Array<number>;
  target: number;
}

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: Body = req.body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  console.log('OUTPUT: daily_exercises', daily_exercises);

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((item) => isNaN(Number(item))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
