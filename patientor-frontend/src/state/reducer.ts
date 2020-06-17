import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'PATIENT_DETAILS';
      payload: Patient;
    }
  | {
      type: 'FETCH_DIAGNOSIS';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: { id: string; newEntry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'PATIENT_DETAILS':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'FETCH_DIAGNOSIS':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {},
          ),
          ...state.diagnoses,
        },
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [...state.patients[action.payload.id].entries, action.payload.newEntry],
          },
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload,
  };
};

export const patientDetails = (payload: Patient): Action => {
  return {
    type: 'PATIENT_DETAILS',
    payload,
  };
};

export const fetchDiagnosis = (payload: Diagnosis[]): Action => {
  return {
    type: 'FETCH_DIAGNOSIS',
    payload,
  };
};

export const addEntry = (payload: { id: string; newEntry: Entry }): Action => {
  return {
    type: 'ADD_ENTRY',
    payload,
  };
};
