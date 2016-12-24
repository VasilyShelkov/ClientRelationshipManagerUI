import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { shallow } from 'enzyme';
import ShowProfile from './ShowProfile';

describe('src/profile/Profile.js', () => {
  it('renders the Home page', () => {
    expect(renderer.create(
      <MuiThemeProvider>
        <ShowProfile
          firstName="Vasily"
          lastName="Shelkov"
          email="vasilydshelkov@gmail.com"
          phone="07123456789"
        />
      </MuiThemeProvider>
    ).toJSON())
      .toMatchSnapshot();
  });

  it('calls the onEditProfile when the button is clicked', () => {
    const onEditProfileMock = jest.fn();
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

    expect(onEditProfileMock.mock.calls.length).toBe(1);
  });
});
