import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import GetProtectedNames from './GetProtectedNames.gql';
import GetMetWithProtectedNames from './GetMetWithProtectedNames.gql';
import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';

import ProtectedNamesLayout from './ProtectedNamesLayout';
import { removeNameFromList } from '../nameListShapeShifter';

const reducer = (nameListType) => (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (
          _.has(action, 'result.data.removeProtectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.protectedId, nameListType
          );
        }
        break;
      case 'MakeClient':
        if (
          _.has(action, 'result.data.addClientToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.nameId, nameListType, true
          );
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const ProtectedNames = compose(
  graphql(GetProtectedNames, {
    options: ({ id }) => ({
      variables: { id },
      reducer: reducer('protected')
    }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loadingProtected: loading,
      protectedNames: user && user.protected,
      ...ownProps
    })
  }),
  graphql(GetMetWithProtectedNames, {
    options: ({ id }) => ({
      variables: { id },
      reducer: reducer('metWithProtected')
    }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loadingMetWithProtected: loading,
      metWithProtectedNames: user && user.metWithProtected,
      ...ownProps
    })
  })
)(ProtectedNamesLayout);

const mapStateToProps = state => ({
  id: state.account.id,
  selectedNameId: state.name.selectedName
});

export default connect(mapStateToProps)(ProtectedNames);

