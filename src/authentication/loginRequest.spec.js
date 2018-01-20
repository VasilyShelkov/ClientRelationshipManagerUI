import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import loginRequest from './loginRequest';
import { logIn, logInSuccess, logInError } from './accountActions';

describe('src/authentication/loginRequest.js', () => {
  it(
    'logs in successfully and goes to returnUrl',
    sinon.test(async function() {
      const values = {
        email: 'testEmail@test.com',
        password: '1234',
      };
      const dispatch = this.spy();
      const loginAccountDetails = { data: { token: 'accountDetails' } };
      const post = this.stub()
        .withArgs('/login', { email: values.email, password: values.password })
        .returns(loginAccountDetails);
      this.stub(axios, 'create').returns({
        post,
        defaults: {},
      });

      const returnUrl = '/account/profile';
      await loginRequest(values, dispatch, { returnUrl });

      expect(dispatch).to.have.been.calledWith(logIn());
      expect(dispatch).to.have.been.calledWith(
        logInSuccess(loginAccountDetails.data),
      );
      expect(dispatch).to.have.been.calledWith(push('/account/profile'));
    }),
  );

  it(
    'attempts to login but service fails',
    sinon.test(async function() {
      const values = {
        email: 'testEmail@test.com',
        password: '1234',
      };
      const dispatch = this.spy();
      const transitionAfterLogin = this.spy();

      const loginError = { response: { data: { error: 'testError' } } };
      const post = this.stub()
        .withArgs('/login', { email: values.email, password: values.password })
        .throws(loginError);
      this.stub(axios, 'create').returns({
        post,
        defaults: {},
      });

      await expect(
        loginRequest(values, dispatch, { returnUrl: '/irrelevant ' }),
      ).to.be.rejectedWith(SubmissionError);

      expect(dispatch).to.have.been.calledWith(logIn());
      expect(dispatch).to.have.been.calledWith(logInError());
    }),
  );
});
