export const isDifferentSender = (messages, m, i, userId) => {
  return (
    i > 0 &&
    (messages[i - 1].sender._id !== m.sender._id ||
      messages[i - 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isFirstMessage = (messages, i, userId) => {
  return i === 0 && messages[0].sender._id !== userId && messages[0].sender._id;
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};