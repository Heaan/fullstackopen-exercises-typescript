import React from 'react';
import { ErrorMessage, FieldProps, Field } from 'formik';
import { Form as FormUi, StrictFormFieldProps, StrictFormGroupProps } from 'semantic-ui-react';

interface UtilFieldProps extends FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  width?: StrictFormFieldProps['width'];
}

export const UtilField: React.FC<UtilFieldProps> = ({ field, label, width, placeholder, type }) => {
  return (
    <FormUi.Field width={width}>
      <label>{label}</label>
      <Field type={type} placeholder={placeholder} {...field} className="ui input" />
      <div style={{ color: 'red', height: '0.2rem' }}>
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

interface FieldChild {
  label: string;
  name: string;
  component: React.FC;
  placeholder?: string;
}

interface NestedFieldProps extends FieldProps {
  title: string;
  fieldChildren: FieldChild[];
  widths?: StrictFormGroupProps['widths'];
}

const fieldsetStyle = {
  border: '1px solid rgba(34,36,38,.15)',
  borderRadius: '.28571429rem',
  color: 'rgba(0,0,0,.87)',
  fontSize: '.92857143em',
  fontWeight: 700,
  margin: '0 0 1em',
};

const legendStyle = {
  margin: 'auto',
  padding: 'inherit',
};

export const NestedField: React.FC<NestedFieldProps> = ({
  field,
  title,
  fieldChildren,
  widths,
}) => (
  <fieldset style={fieldsetStyle}>
    <legend style={legendStyle}>{title}</legend>
    <FormUi.Group widths={widths} {...field} style={{ display: 'flex', alignItems: 'center' }}>
      {fieldChildren.map((fieldChild) => (
        <Field key={fieldChild.name} {...fieldChild} />
      ))}
    </FormUi.Group>
  </fieldset>
);
