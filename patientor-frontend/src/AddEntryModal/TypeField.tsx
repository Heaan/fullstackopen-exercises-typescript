import React from 'react';
import { Field } from 'formik';

import { HealthCheckRating } from '../types';
import { UtilField, SelectField, NestedField } from '../components/Fields';

type RatingOption = {
  value: HealthCheckRating;
  label: string;
};

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Health, label: 'Health' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HightRisk, label: 'Hight risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

const HealthCheckField = () => (
  <SelectField label="Rating Select" name="healthCheckRating" options={ratingOptions} />
);

const HospitalField = () => {
  const fieldChildren = [
    {
      width: 5,
      type: 'date',
      label: 'Date',
      name: 'discharge.date',
      component: UtilField,
    },
    {
      width: 11,
      label: 'Criteria',
      placeholder: 'Criteria',
      name: 'discharge.criteria',
      component: UtilField,
    },
  ];
  return (
    <Field
      title="Discharge"
      name="discharge"
      fieldChildren={fieldChildren}
      component={NestedField}
    />
  );
};

const OccupationalHealthcareField = () => {
  const fieldChildren = [
    {
      type: 'date',
      label: 'Start date',
      name: 'sickLeave.startDate',
      component: UtilField,
    },
    {
      type: 'date',
      label: 'End date',
      name: 'sickLeave.endDate',
      component: UtilField,
    },
  ];
  return (
    <React.Fragment>
      <Field
        label="Employer name"
        name="employerName"
        placeholder="Employer name"
        component={UtilField}
      />
      <Field
        widths="equal"
        title="Sick leave"
        name="sickLeave"
        fieldChildren={fieldChildren}
        component={NestedField}
      />
    </React.Fragment>
  );
};

const TypeField: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'HealthCheck':
      return <HealthCheckField />;
    case 'Hospital':
      return <HospitalField />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareField />;
    default:
      return null;
  }
};

export default TypeField;
