import { NewEntry, HealthCheckRating, Discharge, SickLeave, BaseEntry } from '../types';
import { isString, isDate } from './toNewPatient';

export const isStringArray = (strArr: any[]): strArr is string[] => {
  return Array.isArray(strArr) && strArr.every((str) => isString(str));
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(+param);
};

const isDischarge = (obj: any): obj is Discharge => {
  if ('date' in obj && 'criteria' in obj) {
    return isString(obj.date) && isString(obj.criteria);
  }
  return false;
};

const isSickLeave = (obj: any): obj is SickLeave => {
  return (
    (obj as SickLeave).startDate !== undefined &&
    isDate((obj as SickLeave).startDate) &&
    isString((obj as SickLeave).startDate) &&
    (obj as SickLeave).endDate !== undefined &&
    isDate((obj as SickLeave).endDate) &&
    isString((obj as SickLeave).endDate)
  );
};

const parserDescription = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('incorrect or missing description: ' + param);
  }
  return param;
};

const parserDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing date: ' + date);
  }
  return date;
};

const parserSpecialist = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('incorrect or missing specialist: ' + param);
  }
  return param;
};

const parserDiagnosisCodes = (params: any[]): string[] => {
  if (!isStringArray(params)) {
    throw new Error('incorrect diagnosis codes: ' + params);
  }
  return params;
};

const parserHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('incorrect or missing health check health check rating: ' + rating);
  }
  return rating;
};

const parserDischarge = (obj: any): Discharge => {
  if (!obj || !isDischarge(obj)) {
    throw new Error('incorrect or missing discharge: ' + JSON.stringify(obj));
  }
  return obj;
};

const parserEmployerName = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error('incorrect or missing employer name: ' + str);
  }
  return str;
};

const parserSickLeave = (obj: any): SickLeave | undefined => {
  if (!isSickLeave(obj)) {
    throw new Error('incorrect sickLeave: ' + JSON.stringify(obj));
  }
  return obj;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const toNewEntry = (obj: any): NewEntry => {
  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parserDescription(obj.description),
    date: parserDate(obj.date),
    specialist: parserSpecialist(obj.specialist),
  };
  if ('diagnosisCodes' in obj && obj.diagnosisCodes.length !== 0) {
    baseEntry.diagnosisCodes = parserDiagnosisCodes(obj.diagnosisCodes);
  }
  switch (obj.type) {
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        healthCheckRating: parserHealthCheckRating(obj.healthCheckRating),
        ...baseEntry,
      };
    case 'Hospital':
      return {
        type: 'Hospital',
        discharge: parserDischarge(obj.discharge),
        ...baseEntry,
      };
    case 'OccupationalHealthcare': {
      const retObj: NewEntry = {
        type: 'OccupationalHealthcare',
        employerName: parserEmployerName(obj.employerName),
        ...baseEntry,
      };
      if ('sickLeave' in obj) {
        retObj.sickLeave = parserSickLeave(obj.sickLeave);
      }
      return retObj;
    }
    default:
      return assertNever(obj as never);
  }
};

export default toNewEntry;
