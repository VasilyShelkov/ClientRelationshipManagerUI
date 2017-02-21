import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RemoveUnprotectedName from './RemoveUnprotectedName.gql';
import ProtectName from './ProtectName.gql';

import {
  closeNameDetailsDrawer, openProtectNameDialog, closeProtectNameDialog,
} from '../../nameActions';

import SelectedUnprotectedName from './SelectedUnprotectedName';

const SelectedUnprotectedNameWithMutations = compose(
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
)(SelectedUnprotectedName);

const mapStateToProps = state => ({
  id: state.account.id,
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
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedUnprotectedNameWithMutations);
