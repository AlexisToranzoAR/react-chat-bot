import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import Loading from "./Loading";
import Message from "./Message";
import Options from "./Options";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    px: 3,
    overflow: "auto",
  },
};

function Conversation({
  conversation,
  handleUserResponse,
  isLoading,
  botAvatar,
  userAvatar,
  iconStyle,
  textStyle,
  buttonStyle,
  messageSound
}) {
  const audio = new Audio(messageSound);

  useEffect(() => {
    audio.play();
  }, [conversation]);

  return (
    <Box sx={styles.container}>
      {conversation.map(({ id, text, options, sender }, index) => {
        const previousValue = index > 0 ? conversation[index - 1] : null;

        return (
          <div key={id}>
            {sender === "bot" ? (
              <div>
                {text && (
                  <Message
                    {...{
                      text,
                      sender,
                      previousValue,
                      botAvatar,
                      userAvatar,
                      iconStyle,
                      textStyle,
                    }}
                  />
                )}
                {options && (
                  <Options
                    {...{
                      options,
                      sender,
                      previousValue,
                      botAvatar,
                      userAvatar,
                      handleUserResponse,
                      iconStyle,
                      textStyle,
                      buttonStyle,
                    }}
                  />
                )}
              </div>
            ) : (
              <div>
                <Message
                  {...{
                    text,
                    sender,
                    previousValue,
                    botAvatar,
                    userAvatar,
                    iconStyle,
                    textStyle,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      {isLoading.status && (
        <Loading
          {...{
            conversation,
            sender: isLoading.sender,
            botAvatar,
            userAvatar,
            iconStyle,
            textStyle,
          }}
        />
      )}
    </Box>
  );
}

export default memo(Conversation);
