import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RemoveUnprotectedName from './RemoveUnprotectedName.gql';
import ProtectName from './ProtectName.gql';

import {
  hideUnprotectedName, openProtectNameDialog, closeProtectNameDialog,
} from '../../nameActions';

import SelectedUnprotectedName from './SelectedUnprotectedName';

const SelectedUnprotectedNameWithMutations = compose(
  graphql(RemoveUnprotectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeUnprotectedName: async () => {
        try {
          await mutate({ variables: {
            userId: ownProps.id,
            unprotectedId: ownProps.names[ownProps.selectedNamePosition].id
          } });
          ownProps.hideUnprotectedName();
        } catch (error) {
          console.log(error);
        }
      }
    })
  }),
  graphql(ProtectName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitProtectName: async ({ callDay, callTime, meetingDay, meetingTime }) => {
        const { names, selectedNamePosition } = ownProps;
        const selectedUnprotected = names[selectedNamePosition];

        let callBooked = null;
        if (callDay) {
          callBooked = callDay.substring(0, callDay.indexOf('T')) + callTime.substring(callTime.indexOf('T'));
        }

        let meetingBooked = null;
        if (meetingDay) {
          meetingBooked = meetingDay.substring(0, meetingDay.indexOf('T')) + meetingTime.substring(meetingTime.indexOf('T'));
        }

        try {
          await mutate({
            variables: {
              userId: ownProps.id,
              unprotectedId: selectedUnprotected.id,
              nameId: selectedUnprotected.name.id,
              callBooked,
              meetingBooked
            }
          });
          ownProps.closeProtectNameDialog();
          ownProps.hideUnprotectedName();
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
  selectedNamePosition: state.name.selectedUnprotected,
  protectNameDialogOpen: state.name.protectNameDialogOpen,
  showingCreateForm: state.name.showingCreateForm
});

const mapDispatchToProps = (dispatch) => ({
  hideUnprotectedName: () => dispatch(hideUnprotectedName()),
  openProtectNameDialog: () => dispatch(openProtectNameDialog()),
  closeProtectNameDialog: () => dispatch(closeProtectNameDialog()),
  protectNameSuccess: () => {
    dispatch(push('account/names/protected'));
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedUnprotectedNameWithMutations);
