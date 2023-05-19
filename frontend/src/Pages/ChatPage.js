import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  // setChats 함수로 chats 업데이트
  const [chats, setChats] = useState([]);

  // /api/chat에서 chat 배열을 가져와서 chats에 저장
  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat');

    setChats(data);
  };

  // 컴포넌트가 처음 나타날때에만 fetchChats 호출
  useEffect(() => {
    fetchChats();
  }, []);

  // 각 chat의 chatName을 출력
  return (
    <div>
      {chats.map(chat => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
