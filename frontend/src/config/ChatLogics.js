export const isDifferentSender = (messages, m, i) => {
  return (
    i > 0 &&
    (messages[i - 1].sender._id !== m.sender._id ||
      messages[i - 1].sender._id === undefined)
  );
};

export const isFirstMessage = (messages, i) => {
  return i === 0 && messages[0].sender._id;
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
