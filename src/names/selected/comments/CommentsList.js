import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import InsertCommentIcon from 'material-ui/svg-icons/editor/insert-comment';
import { green500 } from 'material-ui/styles/colors';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import Comment from './CommentWithMutations';
import AddCommentForm from './AddCommentForm';

export default class CommentsList extends Component {
  state = { showAddComment: false };

  showAddComment = () => this.setState(() => ({ showAddComment: true }));
  hideAddComment = () => this.setState(() => ({ showAddComment: false }));

  render() {
    const { userId, loading, comments } = this.props;
    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div id="name-comments">
        <Subheader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {comments.length} Comments
          <IconButton>
            <InsertCommentIcon id="addComment" onClick={this.showAddComment} color={green500} />
          </IconButton>
        </Subheader>
        {this.state.showAddComment && <AddCommentForm userId={userId} hideCommentForm={this.hideAddComment} />}
        {comments.map(comment => <Comment key={comment.id} userId={userId} {...comment} />)}
      </div>
    );
  }
}
