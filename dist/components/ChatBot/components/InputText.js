"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InputText;
require("core-js/modules/es.symbol.description.js");
var _material = require("@mui/material");
var _Enviar = _interopRequireDefault(require("./icons/Enviar"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const styles = {
  container: {
    display: "flex",
    borderTop: "1px solid #DADADA",
    px: 3
  },
  input: {
    height: 40,
    width: "100%",
    border: "none"
  }
};
function InputText(_ref) {
  let {
    userResponse,
    setUserResponse,
    disabled,
    handleUserResponse,
    inputStyle
  } = _ref;
  const handleOnChange = event => {
    setUserResponse(event.target.value);
  };
  const handleSubmitForm = e => {
    e.preventDefault();
    handleUserResponse({
      type: "text",
      text: userResponse
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
    onSubmit: handleSubmitForm,
    component: "form",
    sx: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.InputBase, {
      type: "text",
      sx: _objectSpread(_objectSpread({}, styles.input), inputStyle),
      value: userResponse,
      placeholder: "Responder a Changuito...",
      onChange: handleOnChange,
      disabled: disabled
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase, {
      type: "submit",
      disabled: disabled,
      disableRipple: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Enviar.default, {
        stroke: disabled ? "#DADADA" : "#0B58A4"
      })
    })]
  });
}