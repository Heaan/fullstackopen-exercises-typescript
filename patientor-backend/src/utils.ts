/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient } from './types';

const isString = (str: any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parserName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('incorrect or missing name: ' + name);
  }
  return name;
};

const parserBirthDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing dateOfBirth: ' + date);
  }
  return date;
};

const parserSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const parserGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parserOccupation = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('incorrect or missing occupation: ' + param);
  }
  return param;
};

const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parserName(obj.name),
    dateOfBirth: parserBirthDate(obj.dateOfBirth),
    ssn: parserSSN(obj.ssn),
    gender: parserGender(obj.gender),
    occupation: parserOccupation(obj.occupation),
  };
};

export default toNewPatient;
