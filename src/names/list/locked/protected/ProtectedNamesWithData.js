import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';

import GetProtectedNames from './GetProtectedNames.gql';
import { getNameByNameId } from '../../nameListShapeShifter';
import reducer from './createApolloReducer';
import ProtectedMutations from './ProtectedMutations';

const ProtectedNames = graphql(GetProtectedNames, {
  options: ({ userId }) => ({
    variables: { id: userId },
    reducer: reducer('protected')
  }),
  props: ({ ownProps, data: { loading, user } }) => {
    const selectedName = user && getNameByNameId(user.protected, ownProps.selectedNameId);
    return {
      nameListType: 'protected',
      loading,
      names: user && user.protected,
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
