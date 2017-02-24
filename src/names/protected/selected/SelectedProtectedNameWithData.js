import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveProtectedName from './RemoveProtectedName.gql';

import { showNotification } from '../../../app/appActions';
import {
  hideProtectedName, openProtectNameDialog, closeProtectNameDialog,
  performingNameAction
} from '../../nameActions';

import SelectedProtectedName from './SelectedProtectedName';

const SelectedUnprotectedNameWithMutations = compose(
  graphql(RemoveProtectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeProtectedName: async () => {
        const { names, selectedNamePosition } = ownProps;
        const selectedProtected = names[selectedNamePosition];

        try {
          ownProps.performingNameAction(`Removing ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
          await mutate({ variables: {
            userId: ownProps.id,
            protectedId: selectedProtected.id
          } });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  })
)(SelectedProtectedName);

const mapStateToProps = state => ({
  id: state.account.id,
  protectNameDialogOpen: state.name.protectNameDialogOpen,
});

const mapDispatchToProps = (dispatch) => ({
  hideProtectedName: () => dispatch(hideProtectedName()),
  openProtectNameDialog: () => dispatch(openProtectNameDialog()),
  closeProtectNameDialog: () => dispatch(closeProtectNameDialog()),
  performingNameAction: (message) => dispatch(performingNameAction(message)),
  showErrorNotification: (message) => dispatch(showNotification(message, red500))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedUnprotectedNameWithMutations);
