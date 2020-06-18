// todo Refactor organization codes
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { HealthCheckRating, EntryFormValues } from '../types';
import { useStateValue } from '../state';
import { DateField, SelectField, NestedField } from '../components/Fields';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type TypeOption = {
  value: string;
  label: string;
};

const typesOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
];

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

const HospitalField = () => (
  <Field label="Discharge" name="discharge" placeholder="Discharge" component={NestedField} />
);

const TypeField: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'HealthCheck':
      return <HealthCheckField />;
    case 'Hospital':
      return <HospitalField />;
    default:
      return null;
  }
};

const EntrySchema = Yup.object().shape({
  description: Yup.string().required('Field is required'),
  date: Yup.string().required('Field is required'),
  specialist: Yup.string().required('Field is required'),
  discharge: Yup.object().shape({
    date: Yup.string().required('Field is required'),
    criteria: Yup.string().required('Field is required'),
  }),
});

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Health,
        discharge: {
          date: '',
          criteria: '',
        },
      }}
      onSubmit={onSubmit}
      validationSchema={EntrySchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => (
        <Form>
          <SelectField label="Type Select" name="type" options={typesOptions} />

          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />

          <Field label="Date" name="date" component={DateField} />

          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />

          <TypeField type={values.type} />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={!dirty || !isValid}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
