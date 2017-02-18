import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Name from './Name';
import { openNameDetailsDrawer } from './nameActions';

export const NamesList = ({ names, openNameDetails }) => (
  <div>
    {
      names.length ?
        names.map((name, index) => (
          <Name key={`name-${index}`} showMoreDetails={() => openNameDetails(index)} {...name} />
        ))
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

const mapDispatchToProps = dispatch => ({
  openNameDetails: nameIndexToShow => dispatch(openNameDetailsDrawer(nameIndexToShow)),
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(NamesList);
