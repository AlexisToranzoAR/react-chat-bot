"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStepDataByTrigger;
var _getStepData = _interopRequireDefault(require("./getStepData"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getStepDataByTrigger(steps, trigger, handleNextStepNotFound) {
  const nextStepIndex = steps.findIndex(step => step.id === trigger);
  if (nextStepIndex !== -1) {
    return (0, _getStepData.default)(steps, nextStepIndex);
  } else {
    if (handleNextStepNotFound) {
      return handleNextStepNotFound(trigger);
    } else {
      throw new Error("No se encontro el paso siguiente con el id: " + trigger);
    }
  }
}