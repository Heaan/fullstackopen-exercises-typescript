import React from 'react';
import { ErrorMessage, FieldProps, Field } from 'formik';
import { Form as FormUi } from 'semantic-ui-react';

interface DateProps extends FieldProps {
  label: string;
}

export const DateField: React.FC<DateProps> = ({ field, label }) => {
  return (
    <FormUi.Field>
      <label>{label}</label>
      <Field type="date" {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </FormUi.Field>
  );
};

export type Option<T> = {
  value: T;
  label: string;
};

type SelectFieldProps<T> = {
  name: string;
  label: string;
  options: Option<T>[];
};

export const SelectField = <T extends string | number>({
  name,
  label,
  options,
}: SelectFieldProps<T>) => {
  return (
    <FormUi.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </FormUi.Field>
  );
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({ field, label, placeholder }) => (
  <FormUi.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </FormUi.Field>
);

interface NestedFieldProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const NestedField: React.FC<NestedFieldProps> = ({ field, label, placeholder }) => (
  <FormUi.Group>
    <label>{label}</label>
    <FormUi.Field {...field}>
      <Field label="Date" name="discharge.date" component={DateField} />
      <Field
        label="Criteria"
        placeholder={placeholder}
        name="discharge.criteria"
        component={TextField}
      />
    </FormUi.Field>
  </FormUi.Group>
);
