import { connect } from 'react-redux';

import { openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog } from '../../nameActions';
import { selectName } from '../../selected/selectedActions';

import LockedNamesList from './LockedNamesList';

const mapStateToProps = state => ({
  nameActionInProgress: state.name.actionInProgress
});

const mapDispatchToProps = dispatch => ({
  selectName: nameId => dispatch(selectName(nameId)),
  openEditProtectedNameMeetingDialog: nameId => dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: nameId => dispatch(openEditProtectedNameCallDialog(nameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(LockedNamesList);
