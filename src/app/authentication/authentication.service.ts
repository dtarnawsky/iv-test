import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';

export class AuthenticationService extends IonicAuth {

constructor() {
    const azureConfig: IonicAuthOptions = {
        // The auth provider.
        authConfig: 'azure',
        // The platform which the app is running on
        platform: 'capacitor',
        // client or application id for provider
        clientID: '5a5ef942-0e44-46a8-bbac-6a8ba7654eb0',
        // the discovery url for the provider
        // OpenID configuration
        discoveryUrl: 'https://ioniccs.b2clogin.com/ioniccs.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_SignUp',
        // the URI to redirect to after log in
        redirectUri: 'io.ionic.iv-test://login',
        // requested scopes from provider
        scope: 'openid offline_access email profile https://ioniccs.onmicrosoft.com/5a5ef942-0e44-46a8-bbac-6a8ba7654eb0/user_impersonation',
        // the URL to redirect to after log out
        logoutUrl: 'io.ionic.iv-test://logout',
        // The type of iOS webview to use. 'shared' will use a webview that can
        // share session/cookies on iOS to provide SSO across multiple apps but
        // will cause a prompt for the user which asks them to confirm they want
        // to share site data with the app. 'private' uses a webview which will
        // not prompt the user but will not be able to share session/cookie data
        // either for true SSO across multiple apps.
        iosWebView: 'private'
    };
    
    super(azureConfig);
    }
}