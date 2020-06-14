import express from 'express';

import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/patients', (_req, res) => {
  res.send(patientService.getNonSsnPatientEntry());
});

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err) {
    res.status(400).send(err.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
});

router.get('/patients/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatientById(id);
  if (!patient) {
    res.status(404).end();
  }
  res.json(patient);
});

export default router;
