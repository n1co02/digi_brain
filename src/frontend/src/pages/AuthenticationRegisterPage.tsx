//Author: Nico Mangold
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {RouterRoutes} from '../constants/routerRoutes';
import IconInput from '../components/IconInput';
import {Button} from '../components/general/Buttons.styles';
import {
  ColumnItemsCenterFillSpaceBetween,
  ColumnItemsCenterSpacedBig,
  ColumnItemsCenter,
  ColumnItemsCenterSpaced,
} from '../components/general/Layout.styles';
import {
  Wrapper,
  AuthenticationPane,
  H2,
  H1,
  Footer,
  ImageWrapper,
  ErrorMessage,
} from './AuthenticationPage.styles';
import UserIcon from '../icons/user.svg';
import LockIcon from '../icons/lock.svg';
import {RoomListSearchParams} from '../constants/searchParams';
import register from '../api-v2/queries/queries/registration';
import {
  LoadingSpinnerSmall,
  LoadingSpinnerWrapper,
} from '../components/general/LoadingSpinner.styles';
import {pxToRem} from '../utilities/metric';

//Page that is shown for resgistration
export function AuthenticationRegisterPage() {
  //variables
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
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
  function handleChangeVerifyPassword(event: React.FormEvent<HTMLInputElement>): void {
    setVerifyPassword(event.currentTarget.value);
  }
  async function handleOnRegister(): Promise<void> {
    //if name, password and verifyPassword not empty and password === verifyPassword
    if (name !== '' && password !== '' && verifyPassword !== '' && password === verifyPassword) {
      try {
        //Show loading spinner
        setIsLoading(true);

        //register
        const userId = await register({userName: name, password: password});
        //if userId gets returned, navigate to RoomList Page;  Else, show error message and hide loading spinner
        if (userId) {
          navigate(`${RouterRoutes.RoomList}?${RoomListSearchParams.UserId}=${userId}`);
        } else {
          setShowError(true);
          setIsLoading(false);
        }
      } catch (err) {
        //on error, alert user and hide loading spinner
        console.warn('Error registering:', err);
        alert('There occured an error while trying to register. Please try again');
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
              <IconInput
                isPassword
                value={verifyPassword}
                placeHolder='Verify Password'
                iconSrc={LockIcon}
                onChange={handleChangeVerifyPassword}
              />
              {showError ? (
                <ErrorMessage>Failed to register with this username</ErrorMessage>
              ) : null}
            </ColumnItemsCenterSpaced>
            <Button
              onClick={handleOnRegister}
              disabled={
                isLoading ||
                name === '' ||
                password === '' ||
                verifyPassword === '' ||
                verifyPassword !== password
              }
            >
              {isLoading ? (
                <LoadingSpinnerWrapper>
                  <LoadingSpinnerSmall />
                </LoadingSpinnerWrapper>
              ) : (
                'REGISTER'
              )}
            </Button>
          </ColumnItemsCenterSpacedBig>
          <Footer>
            Already have an Account?
            <Link to={RouterRoutes.Login} style={{marginLeft: pxToRem(5)}}>
              Login here
            </Link>
          </Footer>
        </ColumnItemsCenterFillSpaceBetween>
      </AuthenticationPane>
    </Wrapper>
  );
}
