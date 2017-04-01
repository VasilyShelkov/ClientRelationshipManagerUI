import React from 'react';
import moment from 'moment';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreInfoIcon from 'material-ui/svg-icons/navigation/chevron-right';
import { cyan500, fullWhite } from 'material-ui/styles/colors';

import NameProtectedInfo from './locked/NameProtectedInfo';

const moreInfoStyle = {
  icon: { width: '60px', height: '60px' },
  container: { width: '80px', height: '80px' }
};

export default ({
  name: { firstName, lastName, phone, company },
  callBooked, meetingBooked, created_at,
  selected = false, isProtected = false,
  showMoreDetails, selectedNameDrawerOpen,
  editProtectedMeeting, editProtectedCall
}) => (
  <Paper
    className="name"
    style={{ backgroundColor: selected ? cyan500 : fullWhite }}
    onClick={showMoreDetails}
  >
    <div className="name__info">
      <div className={`name__info__main${selected ? '-selected' : ''}`}>
        <span>{firstName} {lastName} - {phone}</span>
        <span className={`name__info__main__meta${selected ? '-selected' : ''}`}>
          {company.name}
        </span>
      </div>
      {
        isProtected &&
          <NameProtectedInfo
            callBooked={callBooked}
            meetingBooked={meetingBooked}
            selected={selected}
            selectedNameDrawerOpen={selectedNameDrawerOpen}
            editCall={editProtectedCall}
            editMeeting={editProtectedMeeting}
          />
      }
      <span className={`name__info__date${selected ? '-selected' : ''}`}>
        created: {moment(created_at).fromNow()}
      </span>
    </div>

    <div className="name__more">
      <IconButton
        style={moreInfoStyle.container}
        iconStyle={moreInfoStyle.icon}
      >
        <MoreInfoIcon color={selected ? fullWhite : cyan500} />
      </IconButton>
    </div>
  </Paper>
);
