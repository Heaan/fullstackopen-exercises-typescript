import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routers/diagnoses';
import patientRouter from './routers/patients';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.info('someone pinged here');
  res.send('pong!');
});

app.use('/api', diagnoseRouter);
app.use('/api', patientRouter);

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
