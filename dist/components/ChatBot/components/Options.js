"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Options;
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
    gap: 1
  },
  optionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 1
  },
  button: {
    border: "1px solid #0B58A4",
    borderRadius: "10px",
    py: 1.5,
    px: 2,
    color: "#0B58A4"
  },
  iconContainer: {
    minWidth: 56,
    minHeight: 56
  }
};
function Options(_ref) {
  let {
    options,
    sender,
    previousValue,
    botAvatar,
    userAvatar,
    handleUserResponse,
    iconStyle,
    buttonStyle
  } = _ref;
  const showAvatar = previousValue ? sender !== previousValue.sender : true;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
    sx: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
      sx: _objectSpread(_objectSpread({}, styles.iconContainer), iconStyle),
      children: showAvatar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: sender === "bot" ? botAvatar : userAvatar
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
      sx: styles.optionsContainer,
      children: options.map(option => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase, {
        sx: _objectSpread(_objectSpread({}, styles.button), buttonStyle),
        onClick: () => handleUserResponse({
          type: "option",
          option
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          children: option.label
        })
      }, option.value))
    })]
  });
}