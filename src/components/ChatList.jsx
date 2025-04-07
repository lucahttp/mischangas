// src/components/ChatList.jsx
import React from "react";
import { useParams, useLoaderData, useNavigation, Link } from "react-router-dom";

function ChatList({ chats, onSelectChat }) {
  return (
    <div className="p-2 sm:p-4 overflow-y-auto bg-base-100">
      {/* h-screen
      
      <h1 className="text-2xl font-bold mb-4 px-2">Chats</h1> */}
      <ul className="menu bg-base-200 w-full rounded-box">
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link to={"/chat/" + chat.id}>
              <a
                onClick={() => onSelectChat(chat.id)}
                className="flex items-center p-3 hover:bg-base-300"
              >
                <div className="avatar mr-3">
                  <div className="w-12 rounded-full">
                    <img src={chat.avatar} alt={`${chat.name} avatar`} />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  {" "}
                  {/* flex-grow y min-w-0 para que el texto se ajuste */}
                  <div className="font-semibold truncate">{chat.name}</div>
                  <div className="text-sm text-base-content/70 truncate">
                    {chat.lastMessage}
                  </div>
                </div>
                <div className="text-xs text-base-content/50 whitespace-nowrap ml-2">
                  {chat.timestamp}
                </div>
              </a>
            </Link>
          </li>
        ))}
        <br />
        {/* Añadir un poco de espacio al final para que el último item no quede pegado abajo         <li className="h-16"></li>
*/}
      </ul>
    </div>
  );
}

export default ChatList;
