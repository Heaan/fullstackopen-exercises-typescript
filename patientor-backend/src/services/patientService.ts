import patients from '../../data/patients';
import { NonSsnPatient } from '../types';

const getNonSsnPatientEntry = (): NonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSsnPatientEntry,
};
