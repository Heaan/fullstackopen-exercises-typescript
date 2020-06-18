// todo Refactor organization codes
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react';
import { Form as FormUi } from 'semantic-ui-react';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type TypeOption = {
  value: string;
  label: string;
};

const typesOptions: TypeOption[] = [{ value: 'HealthCheck', label: 'Health Check' }];

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
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form>
          <FormUi.Field>
            <label>Types Select</label>
            <Field as="select" name="type">
              {typesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label || option.value}
                </option>
              ))}
            </Field>
          </FormUi.Field>

          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            type="date" //todo date input
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          <FormUi.Field>
            <label>Rating Select</label>
            <Field as="select" name="healthCheckRating">
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label || option.value}
                </option>
              ))}
            </Field>
          </FormUi.Field>

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
