import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import GetNameComments from './GetNameComments.gql';
import AddComment from './AddComment.gql';

import { showNotification } from '../../../app/appActions';
import { performingNameAction } from '../../nameActions';

import CommentsList from './CommentsList';

const SelectedUnprotectedNameWithMutations = compose(
  graphql(GetNameComments, {
    options: ({ id, userId }) => ({ variables: { id, userId } }),
    props: ({ ownProps, data: { loading, name } }) => ({
      loading,
      comments: name && name.comments,
      ...ownProps
    })
  }),
  graphql(AddComment, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitAddComment: async ({ callDay, callTime, meetingDay, meetingTime }) => {
      }
    })
  })
)(CommentsList);

const mapStateToProps = state => ({
  userId: state.account.id,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedUnprotectedNameWithMutations);
