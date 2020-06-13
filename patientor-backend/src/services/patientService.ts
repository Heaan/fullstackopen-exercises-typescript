import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { NonSsnPatient, Patient, NewPatient } from '../types';

const getNonSsnPatientEntry = (): NonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSsnPatientEntry,
  addPatient,
};
