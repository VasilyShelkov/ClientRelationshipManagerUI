import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';

import BookClientCall from '../../edit/BookClientCall.gql';
import BookClientMeeting from '../../edit/BookClientMeeting.gql';
import { onSubmitBookCall, onSubmitBookMeeting } from '../protectedMutations';
import {
  selectName, performingNameAction,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog
} from '../../nameActions';
import { showNotification } from '../../../app/appActions';

import StandardProtectedNames from '../StandardProtectedNamesList';
import EditNameProtectedInfoWithData from '../../edit/EditNameProtectedInfo';

const ClientLayout = props => (
  <div style={props.selectedNameDrawerOpen ? { paddingRight: '250px' } : {}}>
    <StandardProtectedNames nameListType="client" {...props} />
    {
      props.names ?
        <EditNameProtectedInfoWithData
          names={props.names}
          onSubmitBookCall={props.onSubmitBookCall}
          onSubmitBookMeeting={props.onSubmitBookMeeting}
        />
      :
        null
    }
  </div>
);

const ClientsWithEditMutations = compose(
  graphql(BookClientCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: names => onSubmitBookCall({
        mutate,
        userId: ownProps.id,
        names,
        editCallDialogOpen: ownProps.editProtectedNameCallDialogOpen,
        nameListTypeIdKey: 'clientId',
        performingNameAction: ownProps.performingNameAction,
        showErrorNotification: ownProps.showErrorNotification
      }),
      ...ownProps
    })
  }),
  graphql(BookClientMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: names => onSubmitBookMeeting({
        mutate,
        userId: ownProps.id,
        names,
        editMeetingDialogOpen: ownProps.editProtectedNameMeetingDialogOpen,
        nameListTypeIdKey: 'clientId',
        performingNameAction: ownProps.performingNameAction,
        showErrorNotification: ownProps.showErrorNotification
      }),
      ...ownProps
    })
  })
)(ClientLayout);

const mapStateToProps = state => ({
  nameActionInProgress: state.name.actionInProgress,
  editProtectedNameCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editProtectedNameMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen,
});

const mapDispatchToProps = dispatch => ({
  selectName: nameId => dispatch(selectName(nameId)),
  openEditProtectedNameMeetingDialog: nameId => dispatch(openEditProtectedNameMeetingDialog(nameId)),
  openEditProtectedNameCallDialog: nameId => dispatch(openEditProtectedNameCallDialog(nameId)),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsWithEditMutations);
