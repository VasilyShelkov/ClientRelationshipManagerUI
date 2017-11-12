import React from 'react';
import Paper from 'material-ui/Paper';
import Notification from './Notification';

const setup = ({ message, zDepth = 0 }) => {
  const props = { message, zDepth };
  const wrapper = shallowWithContext(<Notification {...props} />);

  return { wrapper, props };
};

describe('src/shared/Notification.js', () => {
  it('does not render anything when there is no message', () => {
    const { wrapper } = setup({ message: '' });
    expect(wrapper.getElement()).to.equal(null);
  });

  it('render the notification with message if there is one', () => {
    const message = 'test notification message';
    const { wrapper } = setup({ message });

    expect(wrapper.find(Paper).exists()).to.be.true;
    expect(wrapper.find('.Form__notification__message').text()).to.equal(
      message,
    );
  });
});
