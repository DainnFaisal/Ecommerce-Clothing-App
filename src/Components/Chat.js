import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import '../StyleSheets/Chat.css';

function Chat() {

  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const adminId = "6oxXlt2y9ecLNgYa6LOOBt058h52";
  const userId = "QzjGQVL8nKcxWVhfArVhl32JvUt1";

  useEffect(() => {

    const q = query(
      collection(db, 'chats', `${userId}_${adminId}`, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (data) => {
    const { message } = data;
    try {
      await addDoc(collection(db, 'chats', `${userId}_${adminId}`, 'messages'), {
        content: message,
        sender: userId,
        timestamp: new Date(),
        receiver: adminId,
      });

      reset();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const replyToUser = async (message) => {
    try {
      await addDoc(collection(db, 'chats', `${userId}_${adminId}`, 'messages'), {
        content: message,
        sender: adminId,
        timestamp: new Date(),
        receiver: userId,
      });
    } catch (error) {
      console.error('Error replying to user:', error);
    }
  };


  const handleReply = (message) => {
    replyToUser(message);
  };

  return (
    <>
    <h3 className='chat-heading'>Chat:</h3>
    <div className="container">
      <div className="chat-window">
        <div className="messages">

          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === userId ? 'sent' : 'received'}`}>
              <p>{message.content}</p>
              {message.sender !== adminId && (
                <li className='tick' onClick={() => handleReply()}>
                </li>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(sendMessage)} className="message-form">
          <input
            className='input-fields'
            type="text"
            placeholder="Type your message..."
            {...register('message', { required: true })}
          />
          <button className='send-btn' type="submit">Send</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Chat;
