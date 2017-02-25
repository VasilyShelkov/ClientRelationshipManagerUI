import React from 'react';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import MeetingIcon from 'material-ui/svg-icons/places/business-center';
import BusinessIcon from 'material-ui/svg-icons/social/group';

export const UnprotectedIcon = props => (
  <LockOpenIcon {...props} />
);

export const ProtectedIcon = props => (
  <LockClosedIcon {...props} />
);

export const MetWithProtectedIcon = props => (
  <BusinessIcon {...props} />
);

export const ClientsIcon = props => (
  <MeetingIcon {...props} />
);
