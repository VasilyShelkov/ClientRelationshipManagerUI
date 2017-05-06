import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import NameDialogForm from '../../NameDialog';
import {
  closeEditProtectedNameCallDialog, closeEditProtectedNameMeetingDialog
} from '../../nameActions';
import { MetWithProtectedIcon } from '../../../app/icons';

export const EditNameProtectedInfo = ({
  names,
  editMeetingDialogOpen,
  editCallDialogOpen,
  onSubmitBookMeeting,
  onSubmitBookCall,
  closeEditMeetingDialog,
  closeEditCallDialog
}) => {
  if (editMeetingDialogOpen !== false) {
    const nameMeetingToEdit = names.find(name => name.name.id === editMeetingDialogOpen);
    const displayName = `${nameMeetingToEdit.name.firstName} ${nameMeetingToEdit.name.lastName}`;
    return (
      <NameDialogForm
        title={`Edit ${displayName}`}
        displayName={displayName}
        open={editMeetingDialogOpen !== false}
        close={closeEditMeetingDialog}
        onSubmit={onSubmitBookMeeting(names)}
        initialValues={{
          meetingDay: nameMeetingToEdit.meetingBooked ? moment(nameMeetingToEdit.meetingBooked).toDate() : null,
          meetingTime: nameMeetingToEdit.meetingBooked ? moment(nameMeetingToEdit.meetingBooked).toDate() : null
        }}
        actions={[
          <FlatButton
            secondary
            onClick={closeEditMeetingDialog}
            label="Cancel"
            icon={<CancelIcon />}
          />,
          <FlatButton
            primary
            id="submitEditProtectedMeeting"
            form="protectNameForm"
            type="submit"
            label="Book Meeting"
            icon={<MetWithProtectedIcon />}
          />
        ]}
      />
    );
  }

  if (editCallDialogOpen !== false) {
    const nameCallToEdit = names.find(name => name.name.id === editCallDialogOpen);
    const displayName = `${nameCallToEdit.name.firstName} ${nameCallToEdit.name.lastName}`;
    return (
      <NameDialogForm
        title={`Edit ${displayName}`}
        displayName={displayName}
        open={editCallDialogOpen !== false}
        close={closeEditCallDialog}
        onSubmit={onSubmitBookCall(names)}
        initialValues={{
          callDay: nameCallToEdit.callBooked ? moment(nameCallToEdit.callBooked).toDate() : null,
          callTime: nameCallToEdit.callBooked ? moment(nameCallToEdit.callBooked).toDate() : null
        }}
        actions={[
          <FlatButton
            secondary
            onClick={closeEditCallDialog}
            label="Cancel"
            icon={<CancelIcon />}
          />,
          <FlatButton
            primary
            id="submitEditProtectedCall"
            form="protectNameForm"
            type="submit"
            label="Book Call"
            icon={<PhoneIcon />}
          />
        ]}
      />
    );
  }

  return null;
};

const mapStateToProps = state => ({
  editCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen
});

const mapDispatchToProps = dispatch => ({
  closeEditCallDialog: () => dispatch(closeEditProtectedNameCallDialog()),
  closeEditMeetingDialog: () => dispatch(closeEditProtectedNameMeetingDialog())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNameProtectedInfo);
