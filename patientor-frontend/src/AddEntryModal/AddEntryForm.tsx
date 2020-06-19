import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button, Form as FormUi, Grid } from 'semantic-ui-react';

import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { HealthCheckRating, EntryFormValues, EntryFormErrors } from '../types';
import { useStateValue } from '../state';
import { UtilField, SelectField } from '../components/Fields';
import TypeField from './TypeField';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type TypeOption = {
  value: string;
  label: string;
};

const typesOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'Health check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational healthcare' },
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
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: EntryFormErrors = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!values.discharge.date) {
            errors.discharge = { ...errors.discharge, date: requiredError };
          }
          if (!values.discharge.criteria) {
            errors.discharge = { ...errors.discharge, criteria: requiredError };
          }
        }
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave.startDate && values.sickLeave.endDate) {
            if (Date.parse(values.sickLeave.startDate) > Date.parse(values.sickLeave.endDate)) {
              errors.sickLeave = {
                ...errors.sickLeave,
                endDate: 'Start date should not be later than end date',
              };
            }
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => (
        <Form className="form ui">
          <FormUi.Group widths="equal" style={{ display: 'flex', alignItems: 'center' }}>
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={UtilField}
            />
            <Field label="Date" name="date" type="date" component={UtilField} />
            <SelectField label="Type Select" name="type" options={typesOptions} />
          </FormUi.Group>

          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={UtilField}
          />

          <TypeField type={values.type} />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="youtube">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button type="submit" floated="right" color="vk" disabled={!dirty || !isValid}>
                Submit
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
