import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import GetProtectedNames from './GetProtectedNames.gql';
import reducer from './createApolloReducer';
import ProtectedMutations from './ProtectedMutations';

const ProtectedNames = graphql(GetProtectedNames, {
  options: ({ userId }) => ({
    variables: { id: userId },
    reducer: reducer('protected')
  }),
  props: ({ ownProps, data: { loading, user } }) => ({
    nameListType: 'protected',
    loading,
    names: user && user.protected,
    ...ownProps
  })
})(ProtectedMutations);

const mapStateToProps = state => ({
  userId: state.account.id
});

export default connect(mapStateToProps)(ProtectedNames);
