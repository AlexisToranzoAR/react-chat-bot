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
    headerStyle,
    iconStyle,
    textStyle,
    buttonStyle,
    language
  } = props;

  validateProps(props, {
    steps: { type: "array", required: true },
    nextStepNotFound: { type: "function", required: false },
    botName: { type: "string", required: true },
    botAvatar: { type: "component", required: true },
    userAvatar: { type: "component", required: true },
    onClose: { type: "function", required: false },
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

  const handleUserResponse = async ({ type, text, option }) => {
    let newMessage = { ...currentStep, sender: "user" };
    let trigger;
    let conversationState = [...conversation];

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
            return;
          }
        }
        setUserResponse("");
      }

      setConversation([...conversationState, { ...nextStep, sender: "bot" }]);
      setCurrentStep({ ...nextStep, sender: "bot" });
    } else {
      setConversation((prevState) => [...prevState, newMessage]);
    }

    setUserResponse("");
  };

  // Si el paso actual es de tipo mensaje para al siguiente en caso de que sea posible
  async function goNextIfText(currentStep) {
    if (currentStep.text) {
      if (!currentStep.end) {
        const trigger = currentStep.trigger;
        const nextStep = await getStepDataByTrigger(
          steps,
          trigger,
          nextStepNotFound
        );

        if (!isDuplicateEntry(conversation, nextStep)) {
          setConversation((prevState) => [
            ...prevState,
            { ...nextStep, sender: "bot" },
          ]);
          setCurrentStep({ ...nextStep, sender: "bot" });
        }
      }
    }
  }

  useEffect(() => {
    goNextIfText(currentStep);
  }, [currentStep]);

  return (
    <Box sx={styles.container}>
      <Header {...{botName, botAvatar, onClose, headerStyle, language}} />
      <Conversation
        {...{
          conversation,
          handleUserResponse,
          botAvatar,
          userAvatar,
          iconStyle,
          textStyle,
          buttonStyle,
        }}
      />
      <InputText
        {...{
          userResponse,
          setUserResponse,
          disabled: !currentStep.user,
          handleUserResponse,
          language,
          botName
        }}
      />
    </Box>
  );
}
