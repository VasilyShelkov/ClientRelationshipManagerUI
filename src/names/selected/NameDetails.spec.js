import React from 'react';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { ListItem } from 'material-ui/List';

import { NameDetails } from './NameDetails';
import EditNameForm from './edit/EditSelectedNameForm';

describe('src/names/selected/NameDetails', () => {
  it('renders name information when not editing', () => {
    const showingEditNameForm = false;
    const firstName = 'testFirstName';
    const lastName = 'testLastName';
    const phone = 'testPhone';
    const name = { firstName, lastName, phone };
    const showEditNameForm = () => 'show form';

    const wrapper = shallow(
      <NameDetails
        showingEditNameForm={showingEditNameForm}
        name={name}
        showEditNameForm={showEditNameForm}
      />,
    );

    // id used for feature testing
    expect(wrapper.find(EditIcon).prop('id')).toBe('editName');
    expect(wrapper.find(EditIcon).prop('onClick')).toBe(showEditNameForm);

    expect(wrapper
      .find(ListItem)
      .first()
      .prop('primaryText')).toContain(firstName);
    expect(wrapper
      .find(ListItem)
      .first()
      .prop('primaryText')).toContain(lastName);

    expect(
      wrapper
        .find(ListItem)
        .last()
        .prop('primaryText'),
    ).toBe(phone);
  });

  it('renders edit name form when editing', () => {
    const showingEditNameForm = true;
    const userId = 'testId';
    const name = { firstName: 'first', lastName: 'last', phone: '12345' };
    const hideEditNameForm = () => 'hide form';
    const isProtected = true;

    const wrapper = shallow(
      <NameDetails
        showingEditNameForm={showingEditNameForm}
        userId={userId}
        name={name}
        hideEditNameForm={hideEditNameForm}
        isProtected={isProtected}
      />,
    );

    const editNameForm = wrapper.find(EditNameForm);

    expect(editNameForm.prop('userId')).toBe(userId);
    expect(editNameForm.prop('initialValues')).toEqual(name);
    expect(editNameForm.prop('cancelEditName')).toBe(hideEditNameForm);
    expect(editNameForm.prop('isProtected')).toBe(isProtected);
  });
});
