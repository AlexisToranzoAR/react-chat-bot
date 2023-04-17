"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStepData;
function getStepData(steps, index) {
  if (!steps.length) throw new Error("No hay steps");
  const {
    id,
    text,
    user,
    options,
    trigger,
    end,
    validator
  } = steps[index];
  if (!id) throw new Error("Id no definido");
  if (!trigger && !options && !end) throw new Error("Trigger no definido");

  // Entra si solo una tiene contenido
  if (text && !user && !options || !text && user && !options || !text && !user && options) {
    return {
      id,
      text,
      user,
      options,
      trigger,
      end,
      validator
    };
  } else {
    throw new Error("Text, user o options solo se puede usar uno a la vez");
  }
}