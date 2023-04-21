import getStepData from "./getStepData";

export default function getStepDataByTrigger(steps, trigger, handleNextStepNotFound) {
  const nextStepIndex = steps.findIndex((step) => step.id === trigger);

  if (nextStepIndex !== -1) {
    return getStepData(steps, nextStepIndex);
  } else {
    if (handleNextStepNotFound) {
      return handleNextStepNotFound(trigger);
    } else {
      throw new Error(`The next step with the id ${trigger} was not found`);
    }
  }
}