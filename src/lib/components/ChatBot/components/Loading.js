import { Box, keyframes } from "@mui/material";

const pulse = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}`;

const styles = {
  container: {
    display: "flex",
    gap: 1,
    "&[data-reverse=true]": {
      flexDirection: "row-reverse",
      "& p": {
        textAlign: "right",
      },
    },
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    maxWidth: 56,
    maxHeight: 56,
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: "10px",
    py: 1.5,
    px: 2,
    minWidth: 0,
  },
  writing: {
    "& span": {
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "#000",
      marginRight: "4px",
      animation: `${pulse} 1s infinite`,
    },
    "& span:nth-of-type(1)": {
      marginLeft: "4px",
    },
    "& span:nth-of-type(2)": {
      animationDelay: "0.1s",
    },
    "& span:nth-of-type(3)": {
      animationDelay: "0.2s",
    },
  },
};

export default function Loading({
  conversation,
  sender,
  botAvatar,
  userAvatar,
  iconStyle,
  textStyle,
}) {
  const previousValue = conversation[conversation.length - 1];
  const showAvatar = previousValue ? sender !== previousValue.sender : true;

  return (
    <Box sx={styles.container} data-reverse={sender === "bot" ? false : true}>
      <Box sx={{ ...styles.iconContainer, ...iconStyle }}>
        {showAvatar && <>{sender === "bot" ? botAvatar : userAvatar}</>}
      </Box>
      <Box sx={{ ...styles.textContainer, ...textStyle }}>
        <Box sx={styles.writing}>
          <span></span>
          <span></span>
          <span></span>
        </Box>
      </Box>
    </Box>
  );
}
