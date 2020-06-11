import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/patients', (_req, res) => {
  res.send(patientService.getNonSsnPatientEntry());
});

export default router;
