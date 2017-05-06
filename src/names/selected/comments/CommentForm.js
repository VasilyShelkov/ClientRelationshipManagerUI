import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import StandardForm from '../../../shared/StandardForm';
import { renderIconDropdown, required } from '../../../shared/FormElements';

export default ({ error, handleSubmit, hideCommentForm, commentFormType }) => (
  <StandardForm
    error={error}
    handleSubmit={handleSubmit}
    handleCancel={hideCommentForm}
    fields={[
      <div key={`${commentFormType}Comment__comment`} style={{ display: 'flex', alignItems: 'center' }}>
        <Field
          name="text"
          component={TextField}
          hintText="Write a comment..."
          validate={required}
          fullWidth
          multiLine
          rows={1}
          rowsMax={4}
          style={{ marginRight: '10px' }}
        />
        <Field name="visibility" component={renderIconDropdown} />
      </div>
    ]}
  />
);
