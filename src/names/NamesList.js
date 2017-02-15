import React from 'react';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';

export default ({ names }) => (
  <div>
    {
      names.length ?
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
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
