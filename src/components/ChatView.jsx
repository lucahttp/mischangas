// src/components/ChatView.jsx
import React, { useRef, useEffect } from 'react';
import { chatsData, messagesData } from './../messages/data'; // Importa los datos
import { useParams, useLoaderData, useNavigation, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";


// https://github.com/shaan-alam/react-router-loaders-example
export const getChat = async (chatId) => {
  console.log(`obteniendo la publicacion con el id ${chatId}, por favor espere`)
  //offerId = "1b112ddb-5e28-49be-8da4-48183ed14fae"
  try {


    
    // Busca los detalles del chat seleccionado
    // const selectedChat = chatsData.find(chat => chat.id === chatId);
    // Obtiene los mensajes del chat seleccionado (o un array vacío si no hay ninguno)
    const currentMessages = chatId ? messagesData[chatId] || [] : [];

    console.log(currentMessages)
    return currentMessages;
  } catch (error) {
    console.warn(error)
    //setError(error);
    return "error"
  }
};




function ChatView({ }) {
  const messages = useLoaderData();

  const navigate = useNavigate();
  
  function handleClick() {
    navigate("/");
  }

  const messagesEndRef = useRef(null); // Referencia para autoscroll

  // Efecto para hacer scroll hacia el último mensaje cuando cambian los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Header */}
      <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>

      <div className="navbar bg-base-200 shadow-sm sticky top-0 z-10">
        <div className="navbar-start">
          <button onClick={handleClick} className="btn btn-ghost btn-circle">
            {/* Icono de flecha atrás (SVG simple) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">{"chat.name"}</a>
        </div>
        <div className="navbar-end">
          {/* Puedes añadir un botón de opciones aquí si quieres */}
        </div>
      </div>

      {/* Área de Mensajes */}
      <div className="flex-grow p-4 overflow-y-auto bg-base-100">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat ${msg.sender === 'me' ? 'chat-end' : 'chat-start'}`}>
            {msg.sender === 'other' && (
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt={`${msg.name} avatar`} src={msg.avatar} />
                </div>
              </div>
            )}
            <div className="chat-header">
              {msg.sender === 'other' ? msg.name : 'Tú'}
              <time className="text-xs opacity-50 ml-1">{msg.timestamp}</time>
            </div>
            <div className={`chat-bubble ${msg.sender === 'me' ? 'chat-bubble-primary' : ''}`}>
              {msg.text}
            </div>
            {/* Puedes añadir un footer al mensaje si es necesario, como "Delivered" */}
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        ))}
        {/* Elemento vacío al final para asegurar que el scroll funciona */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de Mensaje (Footer) */}
      <div className="p-4 bg-base-200 sticky bottom-0 z-10">
        <div className="flex items-center space-x-2">
          <textarea className="textarea textarea-bordered flex-grow resize-none" placeholder="Escribe un mensaje..." rows="1"></textarea>
          <button className="btn btn-primary btn-circle">
             {/* Icono de enviar (SVG simple) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatView;