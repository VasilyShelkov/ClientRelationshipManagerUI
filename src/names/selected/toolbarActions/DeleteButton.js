import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteName from 'material-ui/svg-icons/action/delete';
import { red500 } from 'material-ui/styles/colors';

export default ({ removeNameAction }) => (
  <IconButton id="deleteName" touch onClick={removeNameAction}>
    <DeleteName color={red500} />
  </IconButton>
);
