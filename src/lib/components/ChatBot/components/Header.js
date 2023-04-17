import { Box, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { cloneElement } from "react";
import EnLineaIcon from "./icons/EnLinea";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(89.9deg, #4082F6 0.08%, #1D6AF0 99.12%)",
    borderRadius: "10px 10px 0px 0",
    px: 3,
    py: 1,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "5px solid rgba(204, 224, 248, 0.25);",
  },
  iconNameContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  enLineaContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: 1,
  },
};

export default function Header({ botName, botAvatar, onClose, headerStyle }) {
  return (
    <Box sx={{...styles.container, ...headerStyle}}>
      <Box sx={styles.iconNameContainer}>
        <Box sx={styles.iconContainer}>
          {cloneElement(botAvatar, { width: "50", height: "50" })}
        </Box>
        <Box>
          <Typography color="common.white">{botName}</Typography>
          <Box sx={styles.enLineaContainer}>
            <EnLineaIcon />
            <Typography color="common.white">En línea</Typography>
          </Box>
        </Box>
      </Box>
      {onClose && (
        <Box>
          <IconButton
            onClick={onClose}
            edge="end"
            sx={{ color: "common.white" }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
