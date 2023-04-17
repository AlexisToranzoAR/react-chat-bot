"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceStringTemplate;
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.replace.js");
function replaceStringTemplate(key, value, string) {
  const regex = new RegExp("{".concat(key, "}"));
  return string.replace(regex, value);
}