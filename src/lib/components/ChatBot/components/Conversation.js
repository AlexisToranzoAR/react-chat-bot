import { Box } from "@mui/material";
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

export default function Conversation({
  conversation,
  handleUserResponse,
  botAvatar,
  userAvatar,
  iconStyle,
  textStyle,
  buttonStyle,
}) {
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
    </Box>
  );
}
