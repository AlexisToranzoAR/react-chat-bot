import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import replaceStringTemplate from "./utils/replaceStringTemplate";
import Conversation from "./components/Conversation";
import Header from "./components/Header";
import InputText from "./components/InputText";
import getConversationIndex from "./utils/getConversationIndex";
import getStepData from "./utils/getStepData";
import getStepDataByTrigger from "./utils/getStepDataByTrigger";
import isDuplicateEntry from "./utils/isDuplicateEntry";
import validateProps from "./utils/validateProps";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    borderRadius: "10px",
    width: "100%",
  },
};

export default function ChatBot(props) {
  const {
    steps,
    nextStepNotFound,
    botName,
    botAvatar,
    userAvatar,
    onClose,
    onFinish,
    delay,
    messageSound,
    containerStyle,
    headerStyle,
    iconStyle,
    textStyle,
    buttonStyle,
    language,
  } = props;

  validateProps(props, {
    steps: { type: "array", required: true },
    nextStepNotFound: { type: "function", required: false },
    botName: { type: "string", required: true },
    botAvatar: { type: "component", required: true },
    userAvatar: { type: "component", required: true },
    onClose: { type: "function", required: false },
    onFinish: { type: "function", required: false },
    delay: { type: "number", required: false },
    messageSound: { type: "string", required: false },
    containerStyle: { type: "object", required: false },
    headerStyle: { type: "object", required: false },
    iconStyle: { type: "object", required: false },
    textStyle: { type: "object", required: false },
    buttonStyle: { type: "object", required: false },
    language: { type: "string", required: true },
  });

  const [conversation, setConversation] = useState([
    { ...getStepData(steps, 0), sender: "bot" },
  ]);
  const [currentStep, setCurrentStep] = useState({
    ...getStepData(steps, 0),
    sender: "bot",
  });
  const [userResponse, setUserResponse] = useState("");
  const [isLoading, setIsLoading] = useState({
    status: true,
    sender: "bot",
  });
  const timeoutms = delay || 1000;

  const handleUserResponse = async ({ type, text, option }) => {
    let newMessage = { ...currentStep, sender: "user" };
    let trigger;
    let conversationState = [...conversation];
    setIsLoading({
      status: true,
      sender: "user",
    });
    const comienzo = Date.now();

    // Solo se guarda el label de la opcion en el array de conversacion
    if (type === "text") {
      newMessage = { ...newMessage, text };
      trigger = currentStep.trigger;

      const conversationCurrentStepIndex = getConversationIndex(
        conversation,
        currentStep.id
      );
      conversationState[conversationCurrentStepIndex] = newMessage;
    } else if (type === "option") {
      newMessage = { ...newMessage, text: option.label };
      trigger = option.trigger;

      const conversationCurrentStepIndex = getConversationIndex(
        conversation,
        currentStep.id
      );
      conversationState[conversationCurrentStepIndex] = newMessage;
    } else {
      throw new Error("Tipo de respuesta no valida: " + type);
    }

    if (!currentStep.end) {
      const nextStep = await getStepDataByTrigger(
        steps,
        trigger,
        nextStepNotFound
      );

      if (nextStep.text) {
        nextStep.text = replaceStringTemplate(
          "previousValue",
          newMessage.text,
          nextStep.text
        );
      }

      if (currentStep.user) {
        if (currentStep.validator) {
          const isValid = currentStep.validator(newMessage.text);
          if (isValid !== true) {
            // Handle error de validacion
            setIsLoading({ status: false, sender: "user" });
            return;
          }
        }
        setUserResponse("");
      }

      const fin = Date.now();

      // Si es un step de input del usuario no hay delay
      const delay = nextStep.user
        ? 0
        : Math.max(timeoutms - (comienzo - fin), 0);

      setTimeout(() => {
        setConversation([...conversationState]);
        setIsLoading({ status: true, sender: "bot" });
        setTimeout(() => {
          setConversation([
            ...conversationState,
            { ...nextStep, sender: "bot" },
          ]);
          setCurrentStep({ ...nextStep, sender: "bot" });
          setIsLoading({ status: false, sender: "bot" });
        }, [timeoutms]);
      }, delay);
    } else {
      // Si es un step de input del usuario no hay delay
      const delay = newMessage.user ? 0 : timeoutms;

      setTimeout(() => {
        setConversation((prevState) => [...prevState, newMessage]);
        setIsLoading({ status: false, sender: "bot" });
      }, delay);
      if (onFinish) {
        onFinish([...conversation, newMessage]);
      }
    }

    setUserResponse("");
  };

  // Si el paso actual es de tipo mensaje para al siguiente en caso de que sea posible
  async function goNextIfText(currentStep) {
    if (currentStep.text && !currentStep.end) {
      setIsLoading({ status: true, sender: "bot" });
      const comienzo = Date.now();

      const trigger = currentStep.trigger;
      const nextStep = await getStepDataByTrigger(
        steps,
        trigger,
        nextStepNotFound
      );

      const fin = Date.now();
      if (!currentStep.end) {
        if (!isDuplicateEntry(conversation, nextStep)) {
          // Si es un step de input del usuario no hay delay
          const delay = nextStep.user
            ? 0
            : Math.max(timeoutms - (comienzo - fin), 0);

          setTimeout(() => {
            setConversation((prevState) => [
              ...prevState,
              { ...nextStep, sender: "bot" },
            ]);
            setCurrentStep({ ...nextStep, sender: "bot" });
            setIsLoading({ status: false, sender: "bot" });
          }, delay);
        }
      } else {
        if (onFinish) {
          onFinish(conversation);
        }
      }
    }
  }

  useEffect(() => {
    goNextIfText(currentStep);
  }, [currentStep]);

  return (
    <Box sx={{ ...styles.container, ...containerStyle }}>
      <Header {...{ botName, botAvatar, onClose, headerStyle, language }} />
      <Conversation
        {...{
          conversation,
          handleUserResponse,
          isLoading,
          botAvatar,
          userAvatar,
          iconStyle,
          textStyle,
          buttonStyle,
          messageSound,
        }}
      />
      <InputText
        {...{
          userResponse,
          setUserResponse,
          disabled: !currentStep.user || isLoading.status,
          handleUserResponse,
          language,
          botName,
        }}
      />
    </Box>
  );
}
