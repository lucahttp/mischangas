// src/data.js

export const chatsData = [
    {
      id: 1,
      name: "Alice Smith",
      avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      lastMessage: "¡Claro! Nos vemos mañana.",
      timestamp: "10:35 AM"
    },
    {
      id: 2,
      name: "Bob Johnson",
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg", // Reemplaza con otra imagen si tienes
      lastMessage: "Perfecto, te envío el archivo.",
      timestamp: "Ayer"
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg", // Reemplaza con otra imagen si tienes
      lastMessage: "¿Recibiste mi correo?",
      timestamp: "Vie"
    },
  ];
  
  export const messagesData = {
    1: [ // Mensajes con Alice (id: 1)
      { id: 101, sender: 'other', text: "Hola! ¿Cómo estás?", timestamp: "10:30 AM", name: "Alice Smith", avatar: chatsData[0].avatar },
      { id: 102, sender: 'me', text: "¡Hola Alice! Bien, ¿y tú? ¿Lista para la reunión de mañana?", timestamp: "10:31 AM" },
      { id: 103, sender: 'other', text: "Todo bien por acá. Sí, casi lista.", timestamp: "10:32 AM", name: "Alice Smith", avatar: chatsData[0].avatar },
      { id: 104, sender: 'other', text: "Solo me falta repasar el último punto.", timestamp: "10:32 AM", name: "Alice Smith", avatar: chatsData[0].avatar },
      { id: 105, sender: 'me', text: "Genial. Yo también estoy repasando.", timestamp: "10:33 AM" },
      { id: 106, sender: 'other', text: "¡Claro! Nos vemos mañana.", timestamp: "10:35 AM", name: "Alice Smith", avatar: chatsData[0].avatar },
    ],
    2: [ // Mensajes con Bob (id: 2)
      { id: 201, sender: 'other', text: "Hey, ¿tienes el reporte listo?", timestamp: "Ayer", name: "Bob Johnson", avatar: chatsData[1].avatar },
      { id: 202, sender: 'me', text: "Sí, lo terminé hace un rato.", timestamp: "Ayer" },
      { id: 203, sender: 'other', text: "Excelente, ¿me lo puedes enviar?", timestamp: "Ayer", name: "Bob Johnson", avatar: chatsData[1].avatar },
      { id: 204, sender: 'me', text: "Claro, ahora te lo mando.", timestamp: "Ayer" },
      { id: 205, sender: 'other', text: "Perfecto, te envío el archivo.", timestamp: "Ayer", name: "Bob Johnson", avatar: chatsData[1].avatar },
    ],
     3: [ // Mensajes con Charlie (id: 3)
      { id: 301, sender: 'other', text: "¿Recibiste mi correo?", timestamp: "Vie", name: "Charlie Brown", avatar: chatsData[2].avatar },
      { id: 302, sender: 'me', text: "Hola Charlie, sí, lo acabo de ver. Lo reviso y te respondo.", timestamp: "Vie" },
     ]
  };