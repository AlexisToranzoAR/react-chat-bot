"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Conversation;
var _material = require("@mui/material");
var _Message = _interopRequireDefault(require("./Message"));
var _Options = _interopRequireDefault(require("./Options"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    px: 3,
    overflow: "auto"
  }
};
function Conversation(_ref) {
  let {
    conversation,
    handleUserResponse,
    botAvatar,
    userAvatar,
    iconStyle,
    textStyle,
    buttonStyle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
    sx: styles.container,
    children: conversation.map((_ref2, index) => {
      let {
        id,
        text,
        options,
        sender
      } = _ref2;
      const previousValue = index > 0 ? conversation[index - 1] : null;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: sender === "bot" ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [text && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message.default, {
            text,
            sender,
            previousValue,
            botAvatar,
            userAvatar,
            iconStyle,
            textStyle
          }), options && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Options.default, {
            options,
            sender,
            previousValue,
            botAvatar,
            userAvatar,
            handleUserResponse,
            iconStyle,
            buttonStyle
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message.default, {
            text,
            sender,
            previousValue,
            botAvatar,
            userAvatar,
            iconStyle,
            textStyle
          })
        })
      }, id);
    })
  });
}