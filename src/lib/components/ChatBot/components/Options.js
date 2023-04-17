import { Box, ButtonBase, Typography } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    gap: 1,
  },
  optionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 1,
  },
  button: {
    border: "1px solid #0B58A4",
    borderRadius: "10px",
    py: 1.5,
    px: 2,
    color: "#0B58A4",
  },
  iconContainer: {
    minWidth: 56,
    minHeight: 56,
  },
};

export default function Options({
  options,
  sender,
  previousValue,
  botAvatar,
  userAvatar,
  handleUserResponse,
  iconStyle,
  buttonStyle
}) {
  const showAvatar = previousValue ? sender !== previousValue.sender : true;

  return (
    <Box sx={styles.container}>
      <Box sx={{...styles.iconContainer, ...iconStyle}}>
        {showAvatar && <>{sender === "bot" ? botAvatar : userAvatar}</>}
      </Box>
      <Box sx={styles.optionsContainer}>
        {options.map((option) => (
          <ButtonBase
            sx={{...styles.button, ...buttonStyle}}
            key={option.value}
            onClick={() =>
              handleUserResponse({
                type: "option",
                option,
              })
            }
          >
            <Typography>{option.label}</Typography>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
}
