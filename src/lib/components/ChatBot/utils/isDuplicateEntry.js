export default function isDuplicateEntry(conversation, entry) {
  const isDuplicated = conversation.find((i) => i.id === entry.id);

  if (isDuplicated) {
    throw new Error("Duplicate entry in the conversation id: " + entry.id);
  } else {
    return false;
  }
}