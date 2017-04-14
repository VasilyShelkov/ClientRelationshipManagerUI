import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';

import { showNotification } from '../../../app/appActions';
import { performingNameAction } from '../../nameActions';

import DeleteComment from './DeleteComment.gql';
import EditComment from './EditComment.gql';
import Comment from './Comment';

export const CommentWithMutations = compose(
  graphql(DeleteComment, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      deleteComment: async () => {
        try {
          await mutate({ variables: {
            commentId: ownProps.id,
            userId: ownProps.userId
          } });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  }),
  graphql(EditComment, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      editComment: async ({ text }) => {
        try {
          await mutate({ variables: {
            commentId: ownProps.id,
            userId: ownProps.userId,
            text
          } });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  })
)(Comment);

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(CommentWithMutations);
