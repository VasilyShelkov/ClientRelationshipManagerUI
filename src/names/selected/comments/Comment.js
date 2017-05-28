import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteName from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { grey400, red500, cyan500 } from 'material-ui/styles/colors';
import toMaterialStyle from 'material-color-hash';

import CommentManipulator from './CommentManipulator';

export default class Comment extends Component {
  state = { editingComment: false };

  showEditComment = () => this.setState(() => ({ editingComment: true }));
  hideEditComment = () => this.setState(() => ({ editingComment: false }));

  render() {
    const { userId, subject, commentUser, deleteComment, ...propsForManipulator } = this.props;

    const menuIconButton = (
      <IconButton id="edit-or-delete-comment" touch>
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    return (
      <div className="Comment">
        <div className="Comment__header">
          <div className="Comment__header__container">
            <Avatar
              style={{
                ...toMaterialStyle(`${commentUser.firstName[0].toUpperCase()}${commentUser.lastName[0].toUpperCase()}`),
                minWidth: '40px'
              }}
            >
              {commentUser.firstName[0].toUpperCase()}
              {commentUser.lastName[0].toUpperCase()}
            </Avatar>

            <div className="Comment__header__container__text">
              <div className="Comment__header__container__text__username">
                {userId === commentUser.id ? 'Me' : `${commentUser.firstName} ${commentUser.lastName}`}
              </div>
              <div className="Comment__header__container__text__title">
                {subject}
              </div>
            </div>
          </div>
          {userId === commentUser.id &&
            <IconMenu
              iconButtonElement={menuIconButton}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem id="edit-comment" onTouchTap={this.showEditComment} leftIcon={<EditIcon color={cyan500} />}>
                Edit
              </MenuItem>
              <MenuItem id="delete-comment" onTouchTap={deleteComment} leftIcon={<DeleteName color={red500} />}>
                Delete
              </MenuItem>
            </IconMenu>}
        </div>
        <CommentManipulator
          userId={userId}
          editingComment={this.state.editingComment}
          hideEditComment={this.hideEditComment}
          {...propsForManipulator}
        />
      </div>
    );
  }
}
