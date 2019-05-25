import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import reducer from './createApolloReducer';
import ProtectedMutations from './ProtectedMutations';

const GetMetWithProtectedNames = loader('./GetMetWithProtectedNames.gql');
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
