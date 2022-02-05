import { Log, User, UserManager } from 'oidc-client';
import { Base64 } from 'js-base64';

class AuthService {
  public userManager: UserManager;
  constructor() {
    const settings = {
      authority: 'https://localhost:5000/',
      client_id: 'oidcClient',
      redirect_uri: window.location.origin + '/signin-callback.html',
      silent_redirect_uri: window.location.origin + '/silent-renew.html',
      post_logout_redirect_uri: window.location.origin,
      response_type: process.env.REACT_APP_RESPONSE_TYPE,
      scope: 'api1.read IdentityServerApi',
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      loadUserInfo: true,
      monitorSession: true,
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async getAccessToken(): Promise<any> {
    await this.validate();
    let user = await this.getUser();
    return user?.access_token;

  }

  public async isAuthenticated(): Promise<boolean> {
    let user = await authService.getUser();
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }

  public async getUserRole(): Promise<string> {
    const isAuthed = await this.isAuthenticated();
    if (isAuthed === false) {
      return "anonim";
    }
    const token = await this.getAccessToken();
    var token_parts = token.split(".")
    var token_payload = JSON.parse(Base64.decode(token_parts[1]));

    return token_payload.role;
  }

  public async getUserSub(): Promise<string> {
    await this.validate();
    const token = await this.getAccessToken();
    var token_parts = token.split(".")
    var token_payload = JSON.parse(Base64.decode(token_parts[1]));

    return token_payload.sub;
  }

  private async validate(): Promise<void> {
    const isAuthed = await this.isAuthenticated();
    if (isAuthed === false) {
      throw Error('User not autorized');
    }
  }

}

const authService = new AuthService();
export default authService;
