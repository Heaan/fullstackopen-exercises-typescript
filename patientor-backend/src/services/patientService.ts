import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { NonSsnPatient, Patient, NewPatient, Entry, NewEntry } from '../types';

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

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((item) => item.id === id);
  return patient;
};

const addEntryById = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = patients.find((item) => item.id === id);
  if (patient) {
    const newEntry: Entry = {
      id: uuid(),
      ...entry,
    };
    patient.entries.push(newEntry);
    return newEntry;
  }
  return undefined;
};

export default {
  getNonSsnPatientEntry,
  addPatient,
  getPatientById,
  addEntryById,
};
