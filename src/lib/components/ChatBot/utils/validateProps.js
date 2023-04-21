import { isValidElement } from "react";

export default function validateProps(props, propDefinitions) {
  for (const propName in propDefinitions) {
    if (propDefinitions.hasOwnProperty(propName)) {
      const propDefinition = propDefinitions[propName];
      const propValue = props[propName];

      if (
        propDefinition.required &&
        (propValue === undefined || propValue === null)
      ) {
        throw new Error(`Property "${propName}" is undefined.`);
      }

      if (propValue !== undefined && propValue !== null) {
        const propType = propDefinition.type;

        if (propType === "array") {
          if (!Array.isArray(propValue)) {
            throw new Error(`Property "${propName}" must be of type array`);
          }
        } else if (propType === "component") {
          const isJSXElement =
            typeof propValue === "object" && isValidElement(propValue);

          if (!isJSXElement) {
            throw new Error(`Property "${propName}" must be a React component`);
          }
        } else if (typeof propValue !== propType) {
          throw new Error(`Property "${propName}" must be of type ${propType}`);
        }
      }
    }
  }
}
