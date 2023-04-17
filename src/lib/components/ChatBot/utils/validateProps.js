import {isValidElement} from 'react'

export default function validateProps(props, propDefinitions) {
  for (const propName in propDefinitions) {
    if (propDefinitions.hasOwnProperty(propName)) {
      const propDefinition = propDefinitions[propName];
      const propValue = props[propName];

      if (propDefinition.required && (propValue === undefined || propValue === null)) {
        throw new Error(`Propiedad "${propName}" no definida`);
      }

      if (propValue !== undefined && propValue !== null) {
        const propType = propDefinition.type;

        if (propType === 'array') {
          if (!Array.isArray(propValue)) {
            throw new Error(`Propiedad "${propName}" debe ser de tipo array`);
          }
        } else if (propType === 'component') {
          const isJSXElement = typeof propValue === 'object' && isValidElement(propValue)
          
          
          if (!isJSXElement) {
            throw new Error(`Propiedad "${propName}" debe ser un componente de React`);
          }
        } else if (typeof propValue !== propType) {
          throw new Error(`Propiedad "${propName}" debe ser de tipo ${propType}`);
        }
      }
    }
  }
}