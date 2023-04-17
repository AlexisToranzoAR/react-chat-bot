"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChatBot;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _replaceStringTemplate = _interopRequireDefault(require("./utils/replaceStringTemplate"));
var _Conversation = _interopRequireDefault(require("./components/Conversation"));
var _Header = _interopRequireDefault(require("./components/Header"));
var _InputText = _interopRequireDefault(require("./components/InputText"));
var _getConversationIndex = _interopRequireDefault(require("./utils/getConversationIndex"));
var _getStepData = _interopRequireDefault(require("./utils/getStepData"));
var _getStepDataByTrigger = _interopRequireDefault(require("./utils/getStepDataByTrigger"));
var _isDuplicateEntry = _interopRequireDefault(require("./utils/isDuplicateEntry"));
var _validateProps = _interopRequireDefault(require("./utils/validateProps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    borderRadius: "10px",
    width: "100%"
  }
};
function ChatBot(props) {
  const {
    steps,
    nextStepNotFound,
    botName,
    botAvatar,
    userAvatar,
    onClose,
    iconStyle,
    textStyle,
    buttonStyle
  } = props;
  (0, _validateProps.default)(props, {
    steps: {
      type: "array",
      required: true
    },
    nextStepNotFound: {
      type: "function",
      required: false
    },
    botName: {
      type: "string",
      required: true
    },
    botAvatar: {
      type: "component",
      required: true
    },
    userAvatar: {
      type: "component",
      required: true
    },
    onClose: {
      type: "function",
      required: false
    },
    iconStyle: {
      type: "object",
      required: false
    },
    textStyle: {
      type: "object",
      required: false
    },
    buttonStyle: {
      type: "object",
      required: false
    }
  });
  const [conversation, setConversation] = (0, _react.useState)([_objectSpread(_objectSpread({}, (0, _getStepData.default)(steps, 0)), {}, {
    sender: "bot"
  })]);
  const [currentStep, setCurrentStep] = (0, _react.useState)(_objectSpread(_objectSpread({}, (0, _getStepData.default)(steps, 0)), {}, {
    sender: "bot"
  }));
  const [userResponse, setUserResponse] = (0, _react.useState)("");
  const handleUserResponse = async _ref => {
    let {
      type,
      text,
      option
    } = _ref;
    let newMessage = _objectSpread(_objectSpread({}, currentStep), {}, {
      sender: "user"
    });
    let trigger;
    let conversationState = [...conversation];

    // Solo se guarda el label de la opcion en el array de conversacion
    if (type === "text") {
      newMessage = _objectSpread(_objectSpread({}, newMessage), {}, {
        text
      });
      trigger = currentStep.trigger;
      const conversationCurrentStepIndex = (0, _getConversationIndex.default)(conversation, currentStep.id);
      conversationState[conversationCurrentStepIndex] = newMessage;
    } else if (type === "option") {
      newMessage = _objectSpread(_objectSpread({}, newMessage), {}, {
        text: option.label
      });
      trigger = option.trigger;
      const conversationCurrentStepIndex = (0, _getConversationIndex.default)(conversation, currentStep.id);
      conversationState[conversationCurrentStepIndex] = newMessage;
    } else {
      throw new Error("Tipo de respuesta no valida: " + type);
    }
    if (!currentStep.end) {
      const nextStep = await (0, _getStepDataByTrigger.default)(steps, trigger, nextStepNotFound);
      if (nextStep.text) {
        nextStep.text = (0, _replaceStringTemplate.default)("previousValue", newMessage.text, nextStep.text);
      }
      if (currentStep.user) {
        if (currentStep.validator) {
          const isValid = currentStep.validator(newMessage.text);
          if (isValid !== true) {
            // Handle error de validacion
            return;
          }
        }
        setUserResponse("");
      }
      setConversation([...conversationState, _objectSpread(_objectSpread({}, nextStep), {}, {
        sender: "bot"
      })]);
      setCurrentStep(_objectSpread(_objectSpread({}, nextStep), {}, {
        sender: "bot"
      }));
    } else {
      setConversation(prevState => [...prevState, newMessage]);
    }
    setUserResponse("");
  };

  // Si el paso actual es de tipo mensaje para al siguiente en caso de que sea posible
  async function goNextIfText(currentStep) {
    if (currentStep.text) {
      if (!currentStep.end) {
        const trigger = currentStep.trigger;
        const nextStep = await (0, _getStepDataByTrigger.default)(steps, trigger, nextStepNotFound);
        if (!(0, _isDuplicateEntry.default)(conversation, nextStep)) {
          setConversation(prevState => [...prevState, _objectSpread(_objectSpread({}, nextStep), {}, {
            sender: "bot"
          })]);
          setCurrentStep(_objectSpread(_objectSpread({}, nextStep), {}, {
            sender: "bot"
          }));
        }
      }
    }
  }
  (0, _react.useEffect)(() => {
    goNextIfText(currentStep);
  }, [currentStep]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
    sx: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
      botName: botName,
      botAvatar: botAvatar,
      onClose: onClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Conversation.default, {
      conversation,
      handleUserResponse,
      botAvatar,
      userAvatar,
      iconStyle,
      textStyle,
      buttonStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      userResponse,
      setUserResponse,
      disabled: !currentStep.user,
      handleUserResponse
    })]
  });
}