import getStepData from "./getStepData";

export default function getStepDataByTrigger(steps, trigger, handleNextStepNotFound) {
  const nextStepIndex = steps.findIndex((step) => step.id === trigger);

  if (nextStepIndex !== -1) {
    return getStepData(steps, nextStepIndex);
  } else {
    if (handleNextStepNotFound) {
      return handleNextStepNotFound(trigger);
    } else {
      throw new Error("No se encontro el paso siguiente con el id: " + trigger);
    }
  }
}