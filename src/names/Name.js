import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreInfoIcon from 'material-ui/svg-icons/navigation/chevron-right';

const moreInfoStyle = {
  icon: { width: '60', height: '60' },
  container: { width: '80', height: '80' }
};

export default ({ name: { firstName, lastName, phone, company }, created_at }) => (
  <Paper>
    <div className="name">
      <div className="name__info">
        <div className="name__info__main">
          <span>{firstName} {lastName} - {phone}</span>
          <span className="name__info__main__meta">{company.name}</span>
        </div>
        <span className="name__info__date">created: {moment(created_at).fromNow()}</span>
      </div>
      <div className="name__more">
        <IconButton
          style={moreInfoStyle.container}
          iconStyle={moreInfoStyle.icon}
        >
          <MoreInfoIcon />
        </IconButton>
      </div>
    </div>
  </Paper>
);
