import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import GetProtectedNames from './GetProtectedNames.gql';
import GetMetWithProtectedNames from './GetMetWithProtectedNames.gql';
import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';

import StandardProtectedNamesWithData from './StandardProtectedNamesWithData';
import { removeNameFromList } from '../nameListShapeShifter';

const reducer = (previousResult, action) => {
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

const ProtectedNames = graphql(GetProtectedNames, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.protected,
    nameListType: 'protected',
    ...ownProps
  })
})(StandardProtectedNamesWithData);

const MetWithProtectedNames = graphql(GetMetWithProtectedNames, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.metWithProtected,
    nameListType: 'metWithProtected',
    ...ownProps
  })
})(StandardProtectedNamesWithData);

const mapStateToProps = state => ({
  id: state.account.id,
});

export const ProtectedNamesWithData = connect(mapStateToProps)(ProtectedNames);

export const MetWithProtectedNamesWithData = connect(mapStateToProps)(MetWithProtectedNames);
