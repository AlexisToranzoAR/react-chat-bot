export default function getStepData(steps, index) {
  if (!steps.length) throw new Error("There are no steps");

  const { id, text, user, options, trigger, end, validator } = steps[index];

  if (!id) throw new Error("Undefined id");
  if (!trigger && !options && !end) throw new Error("Undefined trigger");

  // Entra si solo una tiene contenido
  if (
    (text && !user && !options) ||
    (!text && user && !options) ||
    (!text && !user && options)
  ) {
    return {
      id,
      text,
      user,
      options,
      trigger,
      end,
      validator,
    };
  } else {
    throw new Error("Text, user, or options can only be used one at a time");
  }
}
