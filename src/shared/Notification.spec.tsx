import * as React from 'react';
import { shallow } from 'enzyme';
import { Paper, colors } from 'material-ui';
import { Error as ErrorIcon } from 'material-ui-icons';

import Notification from './Notification';

describe('src/shared/Notification.js', () => {
  const DEFAULT_PROPS = {
    message: '',
    zDepth: 0,
    backgroundColor: colors.red[500],
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
    expect(wrapper.find('.Form__notification__message').text()).toEqual(
      message,
    );
  });
});
