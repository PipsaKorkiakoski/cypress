import * as AWS from "aws-sdk";
import { AWSError } from "aws-sdk";

export async function getSecretsFromSecretManager(
  secretId: string,
  secretName: string
) {
  console.log(secretId);

  const params = {
    SecretId: secretId
  };
  const client = new AWS.SecretsManager({
    region: "eu-west-1"
  });
  let secret;
  return new Promise<string>((resolve, reject) => {
    client.getSecretValue(
      params,
      function (
        err: AWSError,
        data: AWS.SecretsManager.GetSecretValueResponse
      ) {
        if (err) return reject(new Error(err.message));
        else {
          secret = data.SecretString;
          const pass = JSON.parse(data.SecretString!).password;
          if (secret.includes(secretName)) {
            secret = JSON.parse(secret);
            secret = secret[secretName];
          }
          return resolve(pass);
        }
      }
    );
  });
}

export function updateSecretToSecretManager(secretString, secretId) {
  const params = {
    SecretId: secretId,
    SecretString: secretString
  };
  const client = new AWS.SecretsManager({
    region: "eu-west-1"
  });
  return new Promise((resolve, reject) => {
    client.updateSecret(params, function (err, data) {
      if (err) return reject(err.message);
      else {
        return resolve(data);
      }
    });
  });
}
