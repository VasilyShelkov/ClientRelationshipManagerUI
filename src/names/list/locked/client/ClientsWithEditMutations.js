import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';

import BookClientCall from './BookCall.gql';
import BookClientMeeting from './BookMeeting.gql';
import { onSubmitBookCall, onSubmitBookMeeting } from '../lockedMutations';
import { performingNameAction, } from '../../../nameActions';
import { showNotification } from '../../../../app/appActions';

import LockedNamesWithData from '../LockedNamesListWithData';
import EditLockedNameInfo from '../EditLockedNameInfo';

const ClientLayout = props => (
  <div style={props.selectedNameDrawerOpen ? { paddingRight: '250px' } : {}}>
    <LockedNamesWithData nameListType="client" {...props} />
    {
      props.names ?
        <EditLockedNameInfo
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
  editProtectedNameCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editProtectedNameMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen,
});

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsWithEditMutations);
