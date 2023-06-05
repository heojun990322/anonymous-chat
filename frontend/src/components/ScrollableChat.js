import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isFirstMessage,
  isDifferentSender,
  isSameUser,
} from '../config/ChatLogics';
import { Text } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';

const ScrollableChat = ({ messages }) => {
  const { user, anonyUser } = ChatState();
  const id = user ? user._id : anonyUser._id;

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <>
            {(isDifferentSender(messages, m, i, id) ||
              isFirstMessage(messages, i, id)) && (
              <div style={{ display: 'flex' }} key={m.sender.userName}>
                <Text
                  style={{ marginLeft: `${m.sender._id === id ? 'auto' : 0}` }}
                  color="black"
                  fontFamily="Noto Sans KR"
                >
                  {m.sender.userName}
                </Text>
              </div>
            )}
            <div style={{ display: 'flex' }} key={m._id}>
              <Text
                style={{
                  backgroundColor: `${
                    m.sender._id === id ? '#BEE3F8' : '#B9F5D0'
                  }`,
                  marginLeft: `${m.sender._id === id ? 'auto' : 0}`,
                  marginTop: isSameUser(messages, m, i, id) ? 3 : 10,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                }}
                color="black"
                fontFamily="Noto Sans KR"
              >
                {m.content}
              </Text>
            </div>
          </>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
