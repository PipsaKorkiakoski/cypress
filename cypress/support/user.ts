export interface User {
  userId: string;
  name: string;
  user_name: string;
  role: string;
  permissions: string[];
  email: string;
  password: string;
  secretName: string;
  secretId: string;
}

export const alma_admin: User = {
  userId: "",
  name: "Admin",
  user_name: "admin@almamedia.local",
  role: "",
  permissions: [],
  email: "admin@almamedia.local",
  password: "",
  secretName: "<add_secretName_here>",
  secretId: "<add_secret's_arn_here>"
};

export const alma_user: User = {
  userId: "",
  name: "User",
  user_name: "user@example.local",
  role: "",
  permissions: [],
  email: "user@example.local",
  password: "",
  secretName: "dev/test/alma_user",
  secretId:
    "arn:aws:secretsmanager:eu-west-1:590130834747:secret:dev/test/alma_user-xLwlTQ"
};

export const alma_apitest: User = {
  userId: "",
  name: "Apitest",
  user_name: "apitest@almamedia.local",
  role: "",
  permissions: [],
  email: "apitest@almamedia.local",
  password: "",
  secretName: "<add_secretName_here>",
  secretId: "<add_secret's_arn_here>"
};

export const alma_e2etest: User = {
  userId: "",
  name: "E2Etest",
  user_name: "e2etest@almamedia.local",
  role: "",
  permissions: [],
  email: "e2etest@almamedia.local",
  password: "",
  secretName: "<add_secretName_here>",
  secretId: "<add_secret's_arn_here>"
};

export const alma_apitest_admin: User = {
  userId: "",
  name: "Apitest Admin",
  user_name: "apitestadmin@almamedia.local",
  role: "",
  permissions: [],
  email: "apitestadmin@almamedia.local",
  password: "",
  secretName: "<add_secretName_here>",
  secretId: "<add_secret's_arn_here>"
};
