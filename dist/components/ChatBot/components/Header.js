"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;
require("core-js/modules/es.symbol.description.js");
var _material = require("@mui/material");
var _CloseRounded = _interopRequireDefault(require("@mui/icons-material/CloseRounded"));
var _react = require("react");
var _EnLinea = _interopRequireDefault(require("./icons/EnLinea"));
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
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(89.9deg, #4082F6 0.08%, #1D6AF0 99.12%)",
    borderRadius: "10px 10px 0px 0",
    px: 3,
    py: 1
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "5px solid rgba(204, 224, 248, 0.25);"
  },
  iconNameContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1
  },
  enLineaContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: 1
  }
};
function Header(_ref) {
  let {
    botName,
    botAvatar,
    onClose,
    headerStyle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
    sx: _objectSpread(_objectSpread({}, styles.container), headerStyle),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
      sx: styles.iconNameContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
        sx: styles.iconContainer,
        children: /*#__PURE__*/(0, _react.cloneElement)(botAvatar, {
          width: "50",
          height: "50"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
          color: "common.white",
          children: botName
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
          sx: styles.enLineaContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_EnLinea.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            color: "common.white",
            children: "En l\xEDnea"
          })]
        })]
      })]
    }), onClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        onClick: onClose,
        edge: "end",
        sx: {
          color: "common.white"
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseRounded.default, {})
      })
    })]
  });
}