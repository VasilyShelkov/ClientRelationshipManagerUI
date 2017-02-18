import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import { closeNameDetailsDrawer } from '../nameActions';
import GetUnprotectedNames from './GetUnprotectedNames.gql';
import RemoveUnprotectedName from './RemoveUnprotectedName.gql';

import UnprotectedNames from './UnprotectedNames';

export const reducer = (previousResult, action) => {
  if (
    action.type === APOLLO_MUTATION_RESULT &&
    action.operationName === 'RemoveUnprotectedName' &&
    _.has(action, 'result.data.removeUnprotectedFromUser') &&
    !_.has(action, 'result.errors')
  ) {
    const removedNameIndex = previousResult.user.unprotected.findIndex(
      ({ id }) => id === action.variables.unprotectedId
    );

    return {
      user: {
        ...previousResult.user,
        unprotected: [
          ...previousResult.user.unprotected.slice(0, removedNameIndex),
          ...previousResult.user.unprotected.slice(removedNameIndex + 1)
        ]
      }
    };
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
        const previouslyOpenNameDetails = ownProps.nameDetailsToShow;
        try {
          await mutate({ variables: { userId: ownProps.id, unprotectedId } });
          ownProps.closeNameDetails();
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
  nameDetailsDrawerOpen: state.name.nameDetailsToShow !== false
});

const mapDispatchToProps = dispatch => ({
  closeNameDetails: () => dispatch(closeNameDetailsDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnprotectedNamesWithData);
