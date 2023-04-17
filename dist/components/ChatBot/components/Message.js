"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Message;
require("core-js/modules/es.symbol.description.js");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const styles = {
  container: {
    display: "flex",
    gap: 1,
    "&[data-reverse=true]": {
      flexDirection: "row-reverse",
      "& p": {
        textAlign: "right"
      }
    }
  },
  iconContainer: {
    minWidth: 56,
    minHeight: 56
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: "10px",
    py: 1.5,
    px: 2,
    minWidth: 0
  },
  text: {
    overflowWrap: "break-word",
    hyphens: "auto"
  }
};
function Message(_ref) {
  let {
    text,
    sender,
    previousValue,
    botAvatar,
    userAvatar,
    iconStyle,
    textStyle
  } = _ref;
  const showAvatar = previousValue ? sender !== previousValue.sender : true;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
    sx: styles.container,
    "data-reverse": sender === "bot" ? false : true,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
      sx: _objectSpread(_objectSpread({}, styles.iconContainer), iconStyle),
      children: showAvatar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: sender === "bot" ? botAvatar : userAvatar
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
      sx: _objectSpread(_objectSpread({}, styles.textContainer), textStyle),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
        sx: styles.text,
        children: text
      })
    })]
  });
}