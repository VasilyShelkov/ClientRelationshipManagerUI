import React from 'react';
import Paper from 'material-ui/Paper';
import { FormErrorNotification } from './FormElements';

const setup = ({ message, zDepth = 0 }) => {
  const props = { message, zDepth };
  const wrapper = shallowWithContext(<FormErrorNotification {...props} />);

  return { wrapper, props };
};

describe('src/shared/FormElements.js', () => {
  describe('FormErrorNotification', () => {
    it('does not render anything when there is no message', () => {
      const { wrapper } = setup({ message: '' });
      expect(wrapper.getNode()).to.equal(null);
    });

    it('render the notification with message if there is one', () => {
      const message = 'test error message';
      const { wrapper } = setup({ message });

      expect(wrapper.find(Paper).exists()).to.be.true;
      expect(wrapper.find('.Form__notification__message').text()).to.equal(message);
    });
  });
});
