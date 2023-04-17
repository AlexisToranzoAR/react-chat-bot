"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDuplicateEntry;
function isDuplicateEntry(conversation, entry) {
  const isDuplicated = conversation.find(i => i.id === entry.id);
  if (isDuplicated) {
    throw new Error("Entrada duplicada en la conversacion id: " + entry.id);
  } else {
    return false;
  }
}