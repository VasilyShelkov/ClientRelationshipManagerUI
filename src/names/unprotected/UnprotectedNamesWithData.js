import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import moment from 'moment';

import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import {
  closeNameDetailsDrawer, openProtectNameDialog, closeProtectNameDialog,
  showCreateNameForm
} from '../nameActions';
import GetUnprotectedNames from './GetUnprotectedNames.gql';
import RemoveUnprotectedName from './RemoveUnprotectedName.gql';
import ProtectName from './ProtectName.gql';

import UnprotectedNames from './UnprotectedNames';

const removeNameFromUnprotected = (previousResult, unprotectedNameToRemoveId) => {
  const removedNamePosition = previousResult.user.unprotected.findIndex(
    ({ id }) => id === unprotectedNameToRemoveId
  );

  return {
    user: {
      ...previousResult.user,
      unprotected: [
        ...previousResult.user.unprotected.slice(0, removedNamePosition),
        ...previousResult.user.unprotected.slice(removedNamePosition + 1)
      ]
    }
  };
};

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveUnprotectedName':
        if (
          _.has(action, 'result.data.removeUnprotectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromUnprotected(
            previousResult, action.variables.unprotectedId
          );
        }
        break;
      case 'ProtectName':
        if (
          _.has(action, 'result.data.protectNameToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromUnprotected(
            previousResult, action.variables.unprotectedId
          );
        }
        break;
      case 'CreateUnprotectedName':
        if (
          _.has(action, 'result.data.addUnprotectedNameToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return {
            user: {
              ...previousResult.user,
              unprotected: [
                action.result.data.addUnprotectedNameToUser,
                ...previousResult.user.unprotected
              ]
            }
          };
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const UnprotectedNamesWithData = compose(
  graphql(GetUnprotectedNames, {
    options: ({ id }) => ({ variables: { id }, reducer }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loading,
      names: user && user.unprotected,
      ...ownProps
    })
  }),
  graphql(RemoveUnprotectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeUnprotectedName: async (unprotectedId) => {
        try {
          await mutate({ variables: { userId: ownProps.id, unprotectedId } });
          ownProps.closeNameDetails();
        } catch (error) {
          console.log(error);
        }
      }
    })
  }),
  graphql(ProtectName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitProtectName: (unprotectedId, nameId) =>
        async ({ callDay, callTime, meetingDay, meetingTime }) => {
          try {
            await mutate({
              variables: {
                userId: ownProps.id,
                unprotectedId,
                nameId,
                callBooked: callDay + callTime,
                meetingBooked: meetingDay + meetingTime
              }
            });
            ownProps.protectNameSuccess();
          } catch (error) {
            console.log(error);
          }
        }
    })
  })
)(UnprotectedNames);

const mapStateToProps = state => ({
  id: state.profile.id,
  nameDetailsToShow: state.name.nameDetailsToShow,
  nameDetailsDrawerOpen: state.name.nameDetailsToShow !== false,
  protectNameDialogOpen: state.name.protectNameDialogOpen,
  showingCreateForm: state.name.showingCreateForm
});

const mapDispatchToProps = (dispatch) => {
  const dispatchCloseProtectNameDialog = () => dispatch(closeProtectNameDialog());

  return {
    closeNameDetails: () => dispatch(closeNameDetailsDrawer()),
    openProtectNameDialog: () => dispatch(openProtectNameDialog()),
    closeProtectNameDialog: dispatchCloseProtectNameDialog,
    protectNameSuccess: () => {
      dispatchCloseProtectNameDialog();
      dispatch(push('account/names/protected'));
    },
    showCreateNameForm: () => dispatch(showCreateNameForm())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnprotectedNamesWithData);
