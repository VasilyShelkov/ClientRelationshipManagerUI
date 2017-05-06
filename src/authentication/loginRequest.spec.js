import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import loginRequest from './loginRequest';
import { logIn, logInSuccess, logInError } from './accountActions';

describe('src/authentication/loginRequest.js', () => {
  it(
    'logs in successfully',
    sinon.test(async function() {
      const values = {
        email: 'testEmail@test.com',
        password: '1234'
      };
      const dispatch = this.spy();
      const transitionAfterLogin = this.spy();
      const props = {
        transitionAfterLogin
      };

      const loginAccountDetails = { data: { token: 'accountDetails' } };
      const post = this.stub()
        .withArgs('/login', { email: values.email, password: values.password })
        .returns(loginAccountDetails);
      this.stub(axios, 'create').returns({
        post,
        defaults: {}
      });

      await loginRequest(values, dispatch, props);

      expect(dispatch).to.have.been.calledWith(logIn());
      expect(dispatch).to.have.been.calledWith(push('/account/profile'));
      expect(dispatch).to.have.been.calledWith(logInSuccess(loginAccountDetails.data));
    })
  );

  it(
    'attempts to login but service fails',
    sinon.test(async function() {
      const values = {
        email: 'testEmail@test.com',
        password: '1234'
      };
      const dispatch = this.spy();
      const transitionAfterLogin = this.spy();
      const props = {
        transitionAfterLogin
      };

      const loginError = { response: { data: { error: 'testError' } } };
      const post = this.stub()
        .withArgs('/login', { email: values.email, password: values.password })
        .throws(loginError);
      this.stub(axios, 'create').returns({
        post,
        defaults: {}
      });

      await expect(loginRequest(values, dispatch, props)).to.be.rejectedWith(SubmissionError);

      expect(dispatch).to.have.been.calledWith(logIn());
      expect(dispatch).to.have.been.calledWith(logInError());
    })
  );
});
