import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { FromErrorNotification } from './FormElements';

export default ({ error, fields, handleSubmit, handleCancel }) => (
  <div className="Profile__details container">
    <FromErrorNotification message={error} zDepth={2} />
    <form onSubmit={handleSubmit}>
      <div className="row">
        {fields}
      </div>

      <br />

      <div className="row">
        {
          handleCancel ?
            <div className="col-6">
              <RaisedButton
                secondary
                fullWidth
                label="Cancel"
                onClick={handleCancel}
                icon={<CancelIcon />}
              />
            </div>
          :
            null
        }

        <div className={handleCancel ? 'col-6' : 'col-12'}>
          <RaisedButton
            primary
            fullWidth
            label="Save"
            type="submit"
            icon={<SaveIcon />}
          />
        </div>
      </div>
    </form>
  </div>
);
