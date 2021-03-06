import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import SelectedName from './SelectedName';
import { hideName } from './selectedActions';

const GetNameComments = loader('./GetNameDetails.gql');
const SelectedNameWithDetails = graphql(GetNameComments, {
  options: ({ id, userId }) => ({ variables: { id, userId } }),
  props: ({ ownProps, data: { loading, name } }) => ({
    loading,
    name,
    ...ownProps,
  }),
})(SelectedName);

const mapStateToProps = state => ({
  userId: state.profile.id,
  id: state.selectedName.nameId,
});

const mapDispatchToProps = dispatch => ({
  closeNameDetails: nameListType => dispatch(hideName(nameListType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedNameWithDetails);
