import { Box, Typography } from "@mui/material";

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
  text: {},
};

export default function Message({
  text,
  sender,
  previousValue,
  botAvatar,
  userAvatar,
  iconStyle,
  textStyle,
}) {
  const showAvatar = previousValue ? sender !== previousValue.sender : true;

  return (
    <Box sx={styles.container} data-reverse={sender === "bot" ? false : true}>
      <Box sx={{ ...styles.iconContainer, ...iconStyle }}>
        {showAvatar && <>{sender === "bot" ? botAvatar : userAvatar}</>}
      </Box>
      <Box sx={{ ...styles.textContainer, ...textStyle }}>
        <Typography variant="body2" sx={styles.text}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
