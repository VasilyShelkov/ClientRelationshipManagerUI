import * as React from 'react';

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockClosedIcon from '@material-ui/icons/LockOutline';
import MeetingIcon from '@material-ui/icons/BusinessCenter';
import BusinessIcon from '@material-ui/icons/Group';

export const UnprotectedIcon = (props: SvgIconProps) => (
  <LockOpenIcon {...props} />
);
export const ProtectedIcon = (props: SvgIconProps) => (
  <LockClosedIcon {...props} />
);
export const MetWithProtectedIcon = (props: SvgIconProps) => (
  <BusinessIcon {...props} />
);
export const ClientsIcon = (props: SvgIconProps) => <MeetingIcon {...props} />;
