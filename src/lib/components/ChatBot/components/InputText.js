import { Box, ButtonBase, InputBase } from "@mui/material";
import EnviarIcon from "./icons/Enviar";
import dictionary from "../assets/dictionary.json"

const styles = {
  container: {
    display: "flex",
    borderTop: "1px solid #DADADA",
    px: 3,
  },
  input: {
    height: 40,
    width: "100%",
    border: "none",
  },
};

export default function InputText({
  userResponse,
  setUserResponse,
  disabled,
  handleUserResponse,
  inputStyle,
  language,
  botName
}) {
  const handleOnChange = (event) => {
    setUserResponse(event.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleUserResponse({
      type: "text",
      text: userResponse,
    });
  };

  return (
    <Box onSubmit={handleSubmitForm} component="form" sx={styles.container}>
      <InputBase
        type="text"
        sx={{...styles.input, ...inputStyle}}
        value={userResponse}
        placeholder={`${dictionary[language].respondTo} ${botName}`}
        onChange={handleOnChange}
        disabled={disabled}
      />
      <ButtonBase type="submit" disabled={disabled} disableRipple>
        <EnviarIcon stroke={disabled ? "#DADADA" : "#0B58A4"} />
      </ButtonBase>
    </Box>
  );
}
