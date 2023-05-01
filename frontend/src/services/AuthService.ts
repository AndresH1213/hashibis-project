import { UserAttribute, UserSignup } from '../model/User';
import { Auth, Amplify } from 'aws-amplify';
import { config } from './config';
import { CognitoUser } from '@aws-amplify/auth';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    localStorage: window.localStorage,
  },
});

export class AuthService {
  public async login(userName: string, password: string): Promise<CognitoUser | undefined> {
    try {
      const user = (await Auth.signIn(userName, password)) as CognitoUser;
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  public async signup(props: UserSignup): Promise<any | undefined> {
    try {
      const signUpResponse = await Auth.signUp({
        username: props.username,
        password: props.password,
        attributes: {
          email: props.email,
        },
      });
      return {
        cognitoUser: signUpResponse.user,
        username: signUpResponse.user.getUsername(),
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  public async getUserAttributes(user: CognitoUser): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    const attributes = await Auth.userAttributes(user);
    result.push(...attributes);

    return result;
  }

  public async getCurrentUser(): Promise<CognitoUser> {
    return await Auth.currentAuthenticatedUser();
  }

  public confirmSignUp(username: string, code: string): Promise<any> {
    return Auth.confirmSignUp(username, code);
  }
}
