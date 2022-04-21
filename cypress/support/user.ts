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

export const test_user: User = {
  userId: "",
  name: "User",
  user_name: "user@example.com",
  role: "",
  permissions: [],
  email: "user@example.com",
  password: "",
  secretName: "dev/test/test_user",
  secretId:
    "arn:aws:secretsmanager:eu-west-1:xxxQ"
};

