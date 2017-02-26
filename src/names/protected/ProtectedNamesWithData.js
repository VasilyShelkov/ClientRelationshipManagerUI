import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { red500 } from 'material-ui/styles/colors';

import GetProtectedNames from './GetProtectedNames.gql';
import BookCall from '../edit/BookCall.gql';
import BookMeeting from '../edit/BookMeeting.gql';
import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import {
  selectProtectedName, performingNameAction,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog
} from '../nameActions';
import { showNotification } from '../../app/appActions';

import ProtectedNames from './ProtectedNames';
import { removeNameFromList } from '../nameListShapeShifter';

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (
          _.has(action, 'result.data.removeProtectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.protectedId, 'protected'
          );
        }
        break;
      case 'MakeClient':
        if (
          _.has(action, 'result.data.addClientToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.nameId, 'protected', true
          );
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const ProtectedNamesWithData = compose(
  graphql(GetProtectedNames, {
    options: ({ id }) => ({ variables: { id }, reducer }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loading,
      names: user && user.protected,
      ...ownProps
    })
  }),
  graphql(BookCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: async ({ callDay, callTime }) => {
        const { names, editProtectedNameCallDialogOpen } = ownProps;
        const selectedProtected = names.find(name => name.name.id === editProtectedNameCallDialogOpen);

        let callBooked = null;
        if (callDay) {
          callBooked = `${moment(callDay).format('YYYY-MM-DD')}T${moment(callTime).format('HH:mm:ss.sss')}Z`;
        }

        try {
          ownProps.performingNameAction(`Booking call for ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
          await mutate({
            variables: {
              userId: ownProps.id,
              protectedId: selectedProtected.id,
              callBooked,
            }
          });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      },
      ...ownProps
    })
  }),
  graphql(BookMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: async ({ meetingDay, meetingTime }) => {
        const { names, editProtectedNameMeetingDialogOpen } = ownProps;
        const selectedProtected = names.find(name => name.name.id === editProtectedNameMeetingDialogOpen);

        let meetingBooked = null;
        if (meetingDay) {
          meetingBooked = `${moment(meetingDay).format('YYYY-MM-DD')}T${moment(meetingTime).format('HH:mm:ss.sss')}Z`;
        }

        try {
          ownProps.performingNameAction(`Booking meeting for ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
          await mutate({
            variables: {
              userId: ownProps.id,
              protectedId: selectedProtected.id,
              meetingBooked
            }
          });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      },
      ...ownProps
    })
  })
)(ProtectedNames);

const mapStateToProps = state => ({
  id: state.account.id,
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

