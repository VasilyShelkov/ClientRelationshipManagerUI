import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../../app/thirdPartyActions';
import GetNameComments from './GetNameComments.gql';
import CommentsList from './CommentsList';

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'AddComment':
        if (
          _.has(action, 'result.data.addCommentToName') &&
          !_.has(action, 'result.errors')
        ) {
          return {
            name: {
              ...previousResult.name,
              comments: [
                action.result.data.addCommentToName,
                ...previousResult.name.comments,
              ],
            },
          };
        }
        break;
      case 'DeleteComment':
        if (
          _.has(action, 'result.data.deleteNameComment') &&
          !_.has(action, 'result.errors')
        ) {
          const removedCommentPosition = previousResult.name.comments.findIndex(
            ({ id }) => id === action.variables.commentId,
          );

          if (removedCommentPosition >= 0) {
            return {
              name: {
                ...previousResult.name,
                comments: [
                  ...previousResult.name.comments.slice(
                    0,
                    removedCommentPosition,
                  ),
                  ...previousResult.name.comments.slice(
                    removedCommentPosition + 1,
                  ),
                ],
              },
            };
          }

          return previousResult;
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const CommentsWithData = graphql(GetNameComments, {
  options: ({ id, userId }) => ({ variables: { id, userId }, reducer }),
  props: ({ ownProps, data: { loading, name } }) => ({
    loading,
    comments: name && name.comments,
    ...ownProps,
  }),
})(CommentsList);

const mapStateToProps = state => ({
  userId: state.profile.id,
});

export default connect(mapStateToProps)(CommentsWithData);
