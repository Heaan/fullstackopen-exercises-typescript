import express from 'express';

import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

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

router.post('/patients/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryById(id, newEntry);
    if (!addedEntry) {
      res.status(404).end();
    }
    res.json(addedEntry);
  } catch (err) {
    res.status(400).send(err.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
});

export default router;
