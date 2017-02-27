import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';

import BookCall from '../edit/BookCall.gql';
import BookMeeting from '../edit/BookMeeting.gql';
import { onSubmitBookCall, onSubmitBookMeeting } from './protectedMutations';
import {
  selectProtectedName, performingNameAction,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog
} from '../nameActions';
import { showNotification } from '../../app/appActions';

import StandardProtectedNames from './StandardProtectedNamesList';

const ProtectedNamesWithData = compose(
  graphql(BookCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: onSubmitBookCall({
        mutate,
        userId: ownProps.id,
        names: ownProps.names,
        editCallDialogOpen: ownProps.editProtectedNameCallDialogOpen,
        nameListTypeIdKey: 'protectedId',
        performingNameAction: ownProps.performingNameAction,
        showErrorNotification: ownProps.showErrorNotification
      }),
      ...ownProps
    })
  }),
  graphql(BookMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: onSubmitBookMeeting({
        mutate,
        userId: ownProps.id,
        names: ownProps.names,
        editMeetingDialogOpen: ownProps.editProtectedNameMeetingDialogOpen,
        nameListTypeIdKey: 'protectedId',
        performingNameAction: ownProps.performingNameAction,
        showErrorNotification: ownProps.showErrorNotification
      }),
      ...ownProps
    })
  })
)(StandardProtectedNames);

const mapStateToProps = state => ({
  selectedNameDrawerOpen: state.name.selectedProtected !== false,
  selectedNamePosition: state.name.selectedProtected,
  nameActionInProgress: state.name.actionInProgress,
  editProtectedNameCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editProtectedNameMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen,
});

const mapDispatchToProps = (dispatch) => ({
  selectProtectedName: (index) => dispatch(selectProtectedName(index)),
  openEditProtectedNameMeetingDialog: (nameId) => dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: (nameId) => dispatch(openEditProtectedNameCallDialog(nameId)),
  performingNameAction: (message) => dispatch(performingNameAction(message)),
  showErrorNotification: (message) => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedNamesWithData);
