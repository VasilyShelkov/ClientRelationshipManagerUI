import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';

import GetMetWithProtectedNames from './GetMetWithProtectedNames.gql';
import { getNameByNameId } from '../../nameListShapeShifter';
import reducer from './createApolloReducer';
import ProtectedMutations from './ProtectedMutations';

const ProtectedNames = graphql(GetMetWithProtectedNames, {
  options: ({ userId }) => ({
    variables: { id: userId },
    reducer: reducer('metWithProtected')
  }),
  props: ({ ownProps, data: { loading, user } }) => {
    const selectedName = user && getNameByNameId(user.metWithProtected, ownProps.selectedNameId);
    return {
      nameListType: 'metWithProtected',
      loading,
      names: user && user.metWithProtected,
      selectedName,
      selectedNameDrawerOpen: selectedName,
      ...ownProps
    };
  }
})(ProtectedMutations);

const mapStateToProps = state => ({
  userId: state.account.id,
  selectedNameId: state.selectedName.id
});

export default connect(mapStateToProps)(ProtectedNames);
