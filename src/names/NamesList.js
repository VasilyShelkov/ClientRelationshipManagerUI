import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Name from './Name';

export default ({ names }) => (
  <div>
    {
      names.length ?
        names.map(Name)
      :
        <RaisedButton
          primary
          label="Create first name"
          icon={<AddIcon />}
          fullWidth
        />
    }
  </div>
);
