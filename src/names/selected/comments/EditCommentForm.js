import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { showNotification } from '../../../app/appActions';
import CommentForm from './CommentForm';

const EditComment = loader('./EditComment.gql');
const EditCommentForm = reduxForm()(CommentForm);

const EditCommentFormWithMutation = graphql(EditComment, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    commentFormType: `edit-${ownProps.commentId}-`,
    form: `editComment-${ownProps.commentId}`,
    onSubmit: async ({ text, visibility }) => {
      const { commentId, userId } = ownProps;

      try {
        await mutate({
          variables: {
            userId,
            commentId,
            text,
            visibility,
          },
        });
        ownProps.hideCommentForm();
      } catch (error) {
        ownProps.showErrorNotification(
          error.graphQLErrors
            ? error.graphQLErrors[0].message
            : 'Oops, something went wrong...',
        );
      }
    },
  }),
})(EditCommentForm);

const mapDispatchToProps = dispatch => ({
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(EditCommentFormWithMutation);
