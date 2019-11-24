import React from 'react';
import { useField, useFormikContext } from 'formik';

import Grid from '@material-ui/core/Grid';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

export const FormikTextField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const error = touched[field.name] && errors[field.name];
  return (
    <div data-testid={`${field.name}-field`}>
      <TextField
        type={props.type}
        label={props.label}
        error={Boolean(error)}
        helperText={error}
        id={props.id || `${field.name}-input`}
        fullWidth={true}
        margin={props.margin || 'normal'}
        {...field}
      />
    </div>
  );
};

export const FormikCheckBox = ({ name, label, inputProps }) => {
  const [field, meta] = useField({ name, type: 'checkbox' });
  return (
    <div data-testid={`${field.name}-field`}>
      <FormControlLabel
        control={
          <Checkbox
            id={field.name}
            checked={field.checked}
            onChange={field.onChange}
            inputProps={inputProps}
          />
        }
        label={label}
      />
    </div>
  );
};

export const FormikSlider = ({ name, label, defaultValue, min, max }) => {
  const [field, meta] = useField({ name });
  const { setFieldValue } = useFormikContext();
  return (
    <div data-testid={`${field.name}-field`}>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={min}
            max={max}
            defaultValue={defaultValue}
            value={field.value}
            onChange={(e, val) => setFieldValue(field.name, val)}
            aria-labelledby="input-slider"
            name={field.name}
          />
        </Grid>
        <Grid item>
          <Input
            value={field.value}
            margin="dense"
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...field}
          />
        </Grid>
      </Grid>
    </div>
  );
};
