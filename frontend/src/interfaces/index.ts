import { CognitoUser } from '@aws-amplify/auth';
import { AuthService } from '../services/AuthService';

interface authProps {
  authService: AuthService;
}

interface LoginProps extends authProps {}
interface RegisterProps extends authProps {}
interface TokenProps extends authProps {}
interface ConfirmEmailProps extends authProps {}

interface IAuthContext {
  auth: { isInit: boolean; user?: CognitoUser; token?: string };
  setAuth: any;
}

type navProps = {
  isAuth: boolean;
};

export type { LoginProps, RegisterProps, TokenProps, ConfirmEmailProps, IAuthContext, navProps };
