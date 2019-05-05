import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { showNotification } from '../../../app/appActions';
import CommentForm from './CommentForm';

const AddCommentToName = loader('./AddCommentToName.gql');
const AddCommentForm = reduxForm({ form: 'addComment' })(CommentForm);

const AddCommentFormWithMutation = graphql(AddCommentToName, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    commentFormType: 'add',
    initialValues: { visibility: 'private' },
    onSubmit: async ({ text, visibility }) => {
      const { nameId, userId } = ownProps;

      try {
        await mutate({
          variables: {
            userId,
            nameId,
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
})(AddCommentForm);

const mapStateToProps = state => ({
  userId: state.profile.id,
  nameId: state.selectedName.nameId,
});

const mapDispatchToProps = dispatch => ({
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCommentFormWithMutation);
