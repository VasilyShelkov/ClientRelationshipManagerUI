import React from 'react';
import moment from 'moment';

import PrivateIcon from 'material-ui/svg-icons/action/visibility';
import PublicIcon from 'material-ui/svg-icons/social/people';
import IconButton from 'material-ui/IconButton';

import EditCommentForm from './EditCommentForm';

export default ({ userId, id, text, visibility, created_at, updated_at, editingComment, hideEditComment }) => (
  <div>
    {editingComment
      ? <EditCommentForm
          initialValues={{ text, visibility }}
          userId={userId}
          commentId={id}
          hideCommentForm={hideEditComment}
        />
      : <div>
          <div className="Comment__content">{text}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="Comment__time">
              <div>{moment(updated_at).fromNow()}</div>
              &nbsp;·&nbsp;
              {moment(created_at).isSame(updated_at, 'second') ? '' : <div>Edited</div>}
            </div>
            {visibility === 'private'
              ? <IconButton
                  className="Comment__visibility__private"
                  iconStyle={{ cursor: 'default' }}
                  tooltip="Private"
                >
                  <PrivateIcon />
                </IconButton>
              : <IconButton className="Comment__visibility__public" iconStyle={{ cursor: 'default' }} tooltip="Public">
                  <PublicIcon />
                </IconButton>}
          </div>
        </div>}
  </div>
);
