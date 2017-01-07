import React from 'react';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import ShowProfile from './ShowProfile';

describe('src/profile/ShowProfile.js', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('renders the Home page', () => {
    const profile = {
      firstName: 'vasily',
      lastName: 'shelkov',
      email: 'vasilydshelkov@gmail.com',
      phone: '07123456789'
    };
    const wrapper = shallowWithContext(
      <ShowProfile
        firstName={profile.firstName}
        lastName={profile.lastName}
        email={profile.email}
        phone={profile.phone}
      />
    );

    const profileDetails = wrapper.find('.Profile__details').text();
    expect(profileDetails).include(profile.firstName);
    expect(profileDetails).include(profile.lastName);
    expect(profileDetails).include(profile.email);
    expect(profileDetails).include(profile.phone);
  });

  it('calls the onEditProfile when the button is clicked', sinon.test(function () {
    const onEditProfileMock = this.spy();
    const wrapper = shallow(
      <ShowProfile
        firstName="Vasily"
        lastName="Shelkov"
        email="vasilydshelkov@gmail.com"
        phone="07123456789"
        onEditProfile={onEditProfileMock}
      />
    );

    const renderedEditButtonClick = wrapper.find(RaisedButton).prop('onClick');
    renderedEditButtonClick();

    expect(onEditProfileMock).to.have.been.called;
  }));
});
