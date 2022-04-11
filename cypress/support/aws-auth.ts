import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from "amazon-cognito-identity-js";

let cachedUserPool: CognitoUserPool | undefined;

export const signin = async (
  username: string,
  password: string
): Promise<void> => {
  const authData = new AuthenticationDetails({
    Username: username,
    Password: password
  });
  const cognitoUser = await createCognitoUser(username);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authData, {
      onSuccess: (result) => {
        window.localStorage.setItem(
          "accessToken",
          result.getAccessToken().getJwtToken()
        );
        resolve();
      },
      onFailure: (err: Error) => {
        reject(err);
      }
    });
  });
};

export const signout = async (): Promise<void> => {
  const user = await getCurrentCognitoUser();
  if (user) user.signOut();
};

export const changepassword = async (
  oldPassword: string,
  newPassword: string
): Promise<string | undefined> => {
  const user = await getCurrentCognitoUser();
  return new Promise((resolve, reject) => {
    if (user) {
      user.getSession((err: Error, session: CognitoUserSession | null) => {
        if (err || !session || !session.isValid()) return reject(err);
      });
      user.changePassword(oldPassword, newPassword, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } else {
      console.log("Couldn't find current user, reject");
      reject("User is null");
    }
  });
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await getCognitoUserWithSession();
    return true;
  } catch (err) {
    return false;
  }
};

const getCognitoUserWithSession = async (): Promise<CognitoUser> => {
  const cognitoUser = await getCurrentCognitoUser();
  if (!cognitoUser) throw new Error("User is not authenticated");

  return new Promise((resolve, reject) => {
    // NOTE: CognitoUser does not seem to keep tabs on sessions by itself, fetching from storage like this sets it
    cognitoUser.getSession((err: Error, session: CognitoUserSession | null) => {
      if (err || !session || !session.isValid()) return reject(err);
      resolve(cognitoUser);
    });
  });
};

const getUserPool = async (): Promise<CognitoUserPool> => {
  if (cachedUserPool) {
    return cachedUserPool;
  }

  const userPool = new CognitoUserPool({
    UserPoolId: Cypress.env("USER_POOL_ID"),
    ClientId: Cypress.env("CLIENT_ID")
  });

  cachedUserPool = userPool;

  return userPool;
};

const getCurrentCognitoUser = async (): Promise<CognitoUser | null> =>
  (await getUserPool()).getCurrentUser();

const createCognitoUser = async (username: string): Promise<CognitoUser> =>
  new CognitoUser({
    Username: username,
    Pool: await getUserPool()
  });
