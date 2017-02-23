import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreInfoIcon from 'material-ui/svg-icons/navigation/chevron-right';

const moreInfoStyle = {
  icon: { width: '60px', height: '60px' },
  container: { width: '80px', height: '80px' }
};

export default ({
  name: { firstName, lastName, phone, company },
  created_at,
  showMoreDetails
}) => (
  <Paper className="name" onClick={showMoreDetails}>
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
  </Paper>
);
