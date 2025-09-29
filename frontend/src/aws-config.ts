// Configuration will be loaded from config.json deployed by CDK
let config: any = null;

export const getAwsConfig = async () => {
  if (!config) {
    try {
      const response = await fetch('/config.json');
      config = await response.json();
    } catch (error) {
      console.error('Failed to load config:', error);
      // Fallback config for development
      config = {
        region: 'us-east-1',
        userPoolId: 'UPDATE_AFTER_DEPLOY',
        userPoolWebClientId: 'UPDATE_AFTER_DEPLOY',
        identityPoolId: 'UPDATE_AFTER_DEPLOY',
        hostedUiDomain: 'UPDATE_AFTER_DEPLOY',
        distributionUrl: 'UPDATE_AFTER_DEPLOY',
        apiUrl: 'UPDATE_AFTER_DEPLOY',
      };
    }
  }

  return {
    Auth: {
      Cognito: {
        region: config.region,
        userPoolId: config.userPoolId,
        userPoolClientId: config.userPoolWebClientId,
        identityPoolId: config.identityPoolId,
        loginWith: {
          oauth: {
            domain: config.hostedUiDomain,
            scopes: ['email', 'openid', 'profile'],
            redirectSignIn: [config.distributionUrl],
            redirectSignOut: [config.distributionUrl],
            responseType: 'code' as const,
          },
        },
      },
    },
    API: {
      REST: {
        TodosAPI: {
          endpoint: config.apiUrl,
          region: config.region,
        },
      },
    },
  };
};
