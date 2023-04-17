export default function getConversationIndex(conversation, id) {
  return conversation.findIndex((i) => i.id === id);
}