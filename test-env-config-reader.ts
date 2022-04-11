import * as environment from "./cdk-outputs.json";

export const getConfigValue = (resourceName: string): string => {
  for (const stackName in environment) {
    for (const resourceFullName in environment[stackName]) {
      if (resourceFullName.includes(resourceName)) {
        return environment[stackName][resourceFullName];
      }
    }
  }
  throw Error("No resouce name found that matches: " + resourceName);
};
