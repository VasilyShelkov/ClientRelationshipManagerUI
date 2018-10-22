import * as React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';
import red from '@material-ui/core/colors/red';

import Notification from './Notification';

describe('src/shared/Notification.js', () => {
  const DEFAULT_PROPS = {
    message: '',
    zDepth: 0,
    backgroundColor: red[500],
    icon: <ErrorIcon style={{ color: 'white' }} />,
  };

  test('does not render anything when there is no message', () => {
    const wrapper = shallow(
      <Notification {...DEFAULT_PROPS} message="" zDepth={0} />,
    );

    expect(wrapper.getElement()).toEqual(null);
  });

  test('render the notification with message if there is one', () => {
    const message = 'test notification message';
    const wrapper = shallow(
      <Notification {...DEFAULT_PROPS} message={message} zDepth={0} />,
    );

    expect(wrapper.find(Paper).exists()).toBeTruthy();
    expect(
      wrapper
        .find(Typography)
        .find(Typography)
        .children()
        .text(),
    ).toContain(message);
  });
});
