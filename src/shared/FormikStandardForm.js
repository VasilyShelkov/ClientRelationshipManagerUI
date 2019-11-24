import React from 'react';
import { Form } from 'formik';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';

import { FormErrorNotification } from './FormElements';
import LoadingSpinner from './LoadingSpinner';

export default ({ error, fields, editingInProgress, handleCancel }) => (
  <div id="StandardForm" className="StandardForm container">
    <FormErrorNotification message={error} zDepth={2} />
    <Form>
      <div className="row">{fields}</div>

      <br />

      {editingInProgress ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          {handleCancel ? (
            <div className="col-6">
              <Button
                style={{ width: '100%' }}
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </div>
          ) : null}

          <div className={handleCancel ? 'col-6' : 'col-12'}>
            <Button
              style={{ width: '100%' }}
              id="standardSubmit"
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </Form>
  </div>
);
