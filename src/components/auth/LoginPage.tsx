import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';
import {isEmpty} from 'lodash';
import {FcGoogle} from 'react-icons/fc';
import styled from 'styled-components';

import userActions from 'actions/userActions';
import {useAppDispatch} from 'hooks';

import validationHelper from 'helpers/validationHelper';

import AppIcon from 'components/common/AppIcon';
import TextInput from 'components/common/TextInput';

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const GoogleIcon = styled(FcGoogle)`
  margin-right: 8px;
`;

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({email: '', password: ''});

  function onChange(field: string, value) {
    const newUser = {...user};

    newUser[field] = value;

    setUser(newUser);
  }

  function loginFormIsValid() {
    const errors = {
      email: '',
      password: ''
    };

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  async function login(e) {
    if (e) e.preventDefault();

    if (!loginFormIsValid()) return;

    const isSuccess: boolean = await dispatch(userActions.loginUser(user));

    if (isSuccess) {
      await dispatch(userActions.getCurrentUser());

      if (!isEmpty(user)) navigate('/');
    }
  }

  async function loginWithGoogle(e) {
    if (e) e.preventDefault();

    await dispatch(userActions.googleLogin());
  }

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1 className="mb-5">
            <AppIcon icon="sign-in" /> Login
          </h1>

          <form onSubmit={login}>
            <TextInput
              name="email"
              label="Email"
              type="email"
              value={user.email}
              onChange={onChange}
              placeholder="Email"
              error={errors.email}
            />

            <TextInput
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={onChange}
              placeholder="Password"
              error={errors.password}
            />

            <Row>
              <Col>
                <Button variant="warning" size="lg" type="submit" onClick={login}>
                  Login
                </Button>
              </Col>
              <Col className="d-flex justify-content-end">
                <GoogleButton variant="outline-secondary" size="lg" onClick={loginWithGoogle}>
                  <GoogleIcon />
                  Google
                </GoogleButton>
              </Col>
            </Row>
          </form>

          <hr />

          <Link to="/password-forgot">Forgot your password?</Link>

          <hr />

          <p>
            Need an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
