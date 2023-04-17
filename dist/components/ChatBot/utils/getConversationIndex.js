"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getConversationIndex;
function getConversationIndex(conversation, id) {
  return conversation.findIndex(i => i.id === id);
}