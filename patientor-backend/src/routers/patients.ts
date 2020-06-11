import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/patients', (_req, res) => {
  res.send(patientService.getNonSsnPatientEntry());
});

router.post('/patients', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  const newPatient = patientService.addPatient(name, dateOfBirth, ssn, gender, occupation);
  res.json(newPatient);
});

export default router;
