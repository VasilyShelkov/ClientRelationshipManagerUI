import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { FormErrorNotification } from './FormElements';
import LoadingSpinner from './LoadingSpinner';

export default ({ error, fields, editingInProgress, handleSubmit, handleCancel }) => (
  <div className="StandardForm container">
    <FormErrorNotification message={error} zDepth={2} />
    <form onSubmit={handleSubmit}>
      <div className="row">
        {fields}
      </div>

      <br />

      {editingInProgress
        ? <LoadingSpinner />
        : <div className="row">
            {handleCancel
              ? <div className="col-6">
                  <RaisedButton secondary fullWidth label="Cancel" onClick={handleCancel} icon={<CancelIcon />} />
                </div>
              : null}

            <div className={handleCancel ? 'col-6' : 'col-12'}>
              <RaisedButton primary fullWidth label="Save" type="submit" icon={<SaveIcon />} />
            </div>
          </div>}
    </form>
  </div>
);
