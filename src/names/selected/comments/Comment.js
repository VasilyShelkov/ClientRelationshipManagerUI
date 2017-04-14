import React, { Component } from 'react';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteName from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PrivateIcon from 'material-ui/svg-icons/action/visibility';
import PublicIcon from 'material-ui/svg-icons/social/people';
import { grey400, red500, cyan500 } from 'material-ui/styles/colors';

import EditCommentForm from './EditCommentForm';

export default class Comment extends Component {
  state = ({ editingComment: false });

  showEditComment = () => this.setState(() => ({ editingComment: true }));
  hideEditComment = () => this.setState(() => ({ editingComment: false }));

  render() {
    const {
      userId,
      id,
      subject,
      text,
      visibility,
      created_at,
      updated_at,
      commentUser,
      editComment,
      deleteComment
    } = this.props;

    const menuIconButton = (
      <IconButton touch>
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    return (
      <div className="Comment">
        <div className="Comment__header">
          <div className="Comment__header__container">
            <Avatar>{commentUser.firstName[0].toUpperCase()}</Avatar>
            <div className="Comment__header__container__text">
              <div className="Comment__header__container__text__username">
                {userId === commentUser.id ? 'Me' : `${commentUser.firstName} ${commentUser.lastName}`}
              </div>
              <div className="Comment__header__container__text__title">
                {subject}
              </div>
            </div>
          </div>
          <IconMenu
            iconButtonElement={menuIconButton}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onTouchTap={this.showEditComment} leftIcon={<EditIcon color={cyan500} />}>
              Edit
            </MenuItem>
            <MenuItem onTouchTap={deleteComment} leftIcon={<DeleteName color={red500} />}>
              Delete
            </MenuItem>
          </IconMenu>
        </div>
        {
          this.state.editingComment ?
            <EditCommentForm
              initialValues={{ text, visibility }}
              userId={userId}
              commentId={id}
              hideCommentForm={this.hideEditComment}
            />
          :
            <div>
              <div className="Comment__content">{text}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="Comment__time">
                  <div>{moment(updated_at).fromNow()}</div>
                  &nbsp;·
                  {created_at !== updated_at ? <div>Edited</div> : ''}
                </div>
                {
                  visibility === 'private' ?
                    <IconButton iconStyle={{ cursor: 'default' }} tooltip="Private">
                      <PrivateIcon />
                    </IconButton>
                  :
                    <IconButton iconStyle={{ cursor: 'default' }} tooltip="Public">
                      <PublicIcon />
                    </IconButton>
                }
              </div>
            </div>
        }
      </div>
    );
  }
}

