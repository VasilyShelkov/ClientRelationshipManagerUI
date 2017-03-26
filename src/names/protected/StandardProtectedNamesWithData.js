import { connect } from 'react-redux';

import {
  selectName, openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog
} from '../nameActions';

import StandardProtectedNames from './StandardProtectedNamesList';

const mapStateToProps = state => ({
  nameActionInProgress: state.name.actionInProgress,
});

const mapDispatchToProps = dispatch => ({
  selectName: nameId => dispatch(selectName(nameId)),
  openEditProtectedNameMeetingDialog: nameId => dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: nameId => dispatch(openEditProtectedNameCallDialog(nameId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardProtectedNames);
