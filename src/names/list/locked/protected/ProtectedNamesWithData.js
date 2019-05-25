import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import reducer from './createApolloReducer';
import ProtectedMutations from './ProtectedMutations';

const GetProtectedNames = loader('./GetProtectedNames.gql');
const ProtectedNames = graphql(GetProtectedNames, {
  options: ({ userId }) => ({
    variables: { id: userId },
    reducer: reducer('protected'),
  }),
  props: ({ ownProps, data: { loading, user } }) => ({
    nameListType: 'protected',
    loading,
    names: user && user.protected,
    ...ownProps,
  }),
})(ProtectedMutations);

const mapStateToProps = state => ({
  userId: state.account.id,
});

export default connect(mapStateToProps)(ProtectedNames);
