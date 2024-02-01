//Author: Nico Mangold
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {RouterRoutes} from '../constants/routerRoutes';
import IconInput from '../components/IconInput';
import {
  Footer,
  H1,
  H2,
  ImageWrapper,
  AuthenticationPane,
  Wrapper,
  ErrorMessage,
} from './AuthenticationPage.styles';
import UserIcon from '../icons/user.svg';
import LockIcon from '../icons/lock.svg';
import {
  ColumnItemsCenter,
  ColumnItemsCenterFillSpaceBetween,
  ColumnItemsCenterSpaced,
  ColumnItemsCenterSpacedBig,
} from '../components/general/Layout.styles';
import {Button} from '../components/general/Buttons.styles';
import {RoomListSearchParams} from '../constants/searchParams';
import login from '../api-v2/queries/queries/login';
import {
  LoadingSpinnerWrapper,
  LoadingSpinnerSmall,
} from '../components/general/LoadingSpinner.styles';
import {pxToRem} from '../utilities/metric';

//Page that is shown for login
export function AuthenticationLoginPage() {
  //variables
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //handlers
  function handleChangeName(event: React.FormEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value);
  }
  function handleChangePassword(event: React.FormEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }
  async function handleOnLogin(): Promise<void> {
    //if name and password not empty
    if (name !== '' && password !== '') {
      try {
        //Show loading spinner
        setIsLoading(true);

        //login
        const userId = await login({userName: name, password: password});
        //if userId gets returned, navigate to RoomList Page; Else, show error message and hide loading spinner
        if (userId) {
          navigate(`${RouterRoutes.RoomList}?${RoomListSearchParams.UserId}=${userId}`);
        } else {
          setShowError(true);
          setIsLoading(false);
        }
      } catch (err) {
        //on error, alert user and hide loading spinner
        console.warn('Error logging in:', err);
        alert('There occured an error while trying to login. Please try again');
        setIsLoading(false);
      }
    }
  }

  //components
  return (
    <Wrapper>
      <ImageWrapper />
      <AuthenticationPane>
        <ColumnItemsCenterFillSpaceBetween>
          <ColumnItemsCenterSpacedBig>
            <ColumnItemsCenter>
              <H2>WELCOME TO</H2>
              <H1>DigiBrain</H1>
            </ColumnItemsCenter>
            <ColumnItemsCenterSpaced>
              <IconInput
                value={name}
                placeHolder='Username'
                iconSrc={UserIcon}
                onChange={handleChangeName}
              />
              <IconInput
                isPassword
                value={password}
                placeHolder='Password'
                iconSrc={LockIcon}
                onChange={handleChangePassword}
              />
              {showError ? <ErrorMessage>Wrong username or password</ErrorMessage> : null}
            </ColumnItemsCenterSpaced>
            <Button onClick={handleOnLogin} disabled={isLoading || name === '' || password === ''}>
              {isLoading ? (
                <LoadingSpinnerWrapper>
                  <LoadingSpinnerSmall />
                </LoadingSpinnerWrapper>
              ) : (
                'LOGIN'
              )}
            </Button>
          </ColumnItemsCenterSpacedBig>
          <Footer>
            Don't have an Account?
            <Link to={RouterRoutes.Register} style={{marginLeft: pxToRem(5)}}>
              Register here
            </Link>
          </Footer>
        </ColumnItemsCenterFillSpaceBetween>
      </AuthenticationPane>
    </Wrapper>
  );
}
