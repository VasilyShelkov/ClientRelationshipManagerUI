import React from 'react';
import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import { MetWithProtectedIcon } from '../app/icons';

export default ({
  callBooked, meetingBooked, selected, selectedNameDrawerOpen
}) => {
  const protectedNameClassName = `col-12 col-${selectedNameDrawerOpen ? 'md' : 'sm'}-6`;
  return (
    <div className={`row name__info__protectedInfo${selected ? '-selected' : ''}`}>
      <div className={protectedNameClassName} style={{ marginTop: '10px' }}>
        {
          callBooked ?
            <div className={`name__info__protectedInfo__detail${selectedNameDrawerOpen ? '-withDrawer' : ''}`}>
              <PhoneIcon color={selected && 'white'} style={{ marginRight: '10px' }} />
              {moment(callBooked).fromNow()}
            </div>
          :
            <div className={`name__info__protectedInfo__detail${selectedNameDrawerOpen ? '-withDrawer' : ''}`}>
              <RaisedButton primary={!selected} label="Book call" />
            </div>
        }
      </div>
      <div className={protectedNameClassName} style={{ marginTop: '10px' }}>
        {
          meetingBooked ?
            <div className={`name__info__protectedInfo__detail${selectedNameDrawerOpen ? '-withDrawer' : ''}`}>
              <MetWithProtectedIcon color={selected && 'white'} style={{ marginRight: '10px' }} />
              {moment(meetingBooked).fromNow()}
            </div>
          :
            <div className={`name__info__protectedInfo__detail${selectedNameDrawerOpen ? '-withDrawer' : ''}`}>
              <RaisedButton primary={!selected} label="Book meeting" />
            </div>
        }
      </div>
    </div>
  );
};

