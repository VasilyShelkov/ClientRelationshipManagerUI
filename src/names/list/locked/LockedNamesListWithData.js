import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { selectName } from '../../selected/selectedActions';
import { openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog } from '../../nameActions';
import LockedNamesList from './LockedNamesList';

const mapDispatchToProps = dispatch => ({
  selectName: selectedNameList => nameId => dispatch(selectName(nameId, selectedNameList)),
  openEditProtectedNameMeetingDialog: nameId => dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: nameId => dispatch(openEditProtectedNameCallDialog(nameId))
});

export default connect(() => ({}), mapDispatchToProps)(LockedNamesList);
