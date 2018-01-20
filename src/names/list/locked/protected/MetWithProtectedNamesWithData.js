import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import GetMetWithProtectedNames from './GetMetWithProtectedNames.gql';
import reducer from './createApolloReducer';
import ProtectedMutations from './ProtectedMutations';

const ProtectedNames = graphql(GetMetWithProtectedNames, {
  options: ({ userId }) => ({
    variables: { id: userId },
    reducer: reducer('metWithProtected'),
  }),
  props: ({ ownProps, data: { loading, user } }) => ({
    nameListType: 'metWithProtected',
    loading,
    names: user && user.metWithProtected,
    ...ownProps,
  }),
})(ProtectedMutations);

const mapStateToProps = state => ({
  userId: state.account.id,
});

export default connect(mapStateToProps)(ProtectedNames);
