// src/App.jsx
import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import { chatsData, messagesData } from './messages/data'; // Importa los datos

function ChatMain() {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleBackToList = () => {
    setSelectedChatId(null);
  };

  // Busca los detalles del chat seleccionado
  const selectedChat = chatsData.find(chat => chat.id === selectedChatId);
  // Obtiene los mensajes del chat seleccionado (o un array vacío si no hay ninguno)
  const currentMessages = selectedChatId ? messagesData[selectedChatId] || [] : [];

  return (
    <div className="bg-base-100 font-sans">
      {/* min-h-screen  */}
      {selectedChatId === null ? (
        // Muestra la lista de chats si no hay ninguno seleccionado
        <ChatList chats={chatsData} onSelectChat={handleSelectChat} />
      ) : (
        // Muestra la vista del chat seleccionado
        <ChatView
          chat={selectedChat}
          messages={currentMessages}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}

export default ChatMain;