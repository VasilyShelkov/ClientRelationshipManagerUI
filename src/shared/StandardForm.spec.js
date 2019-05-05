import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import StandardForm from './StandardForm';
import LoadingSpinner from './LoadingSpinner';
import { FormErrorNotification } from './FormElements';

const setup = ({
  error = '',
  editingInProgress = false,
  handleSubmit = () => '',
  handleCancel = null,
}) => {
  const props = {
    fields: 'input fields',
    error,
    editingInProgress,
    handleSubmit,
    handleCancel,
  };
  const wrapper = shallowWithContext(<StandardForm {...props} />);

  return { props, wrapper };
};

describe('src/shared/StandardForm.js', () => {
  it('renders loading spinner when editing in progress', () => {
    const { wrapper } = setup({ editingInProgress: true });

    expect(wrapper.find(LoadingSpinner).exists()).toBe(true);
    expect(wrapper.find(RaisedButton).exists()).toBe(false);
  });

  it(
    'renders the form passing the correct props',
    sinon.test(function() {
      const handleSubmit = this.spy();
      const { wrapper, props } = setup({ handleSubmit });

      expect(wrapper.find(LoadingSpinner).exists()).toBe(false);
      expect(wrapper.find(FormErrorNotification).prop('message')).toBe(props.error);

      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
      form.prop('onSubmit')();
      expect(handleSubmit).to.have.been.called;
    }),
  );

  it(
    'renders CTAS when editing not in progress',
    sinon.test(function() {
      const { wrapper } = setup({ editingInProgress: false });

      const ctas = wrapper.find(RaisedButton);
      expect(ctas.prop('label')).toBe('Save');
      expect(ctas.prop('type')).toBe('submit');
    }),
  );

  it('only renders the submit button when no it can not handle cancel', () => {
    const { wrapper } = setup({ handleCancel: null });

    const ctas = wrapper.find(RaisedButton);
    expect(ctas).length.to.be(1);
    expect(ctas.prop('type')).toBe('submit');
    expect(ctas.prop('label')).toBe('Save');
    expect(ctas.parent().hasClass('col-12')).toBe(true);
  });

  it(
    'renders both submit and cancel when it can handle cancel',
    sinon.test(function() {
      const handleCancel = this.spy();
      const { wrapper } = setup({ handleCancel });

      const ctas = wrapper.find(RaisedButton);
      const cancelButton = ctas.at(0);
      cancelButton.prop('onClick')();
      expect(cancelButton.prop('label')).toBe('Cancel');
      expect(handleCancel).to.have.been.called;

      const submitButton = ctas.at(1);
      expect(submitButton.prop('label')).toBe('Save');
      expect(submitButton.prop('type')).toBe('submit');
      expect(submitButton.parent().hasClass('col-6')).toBe(true);
    }),
  );
});
