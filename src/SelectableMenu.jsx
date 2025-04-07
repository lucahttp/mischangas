import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const SelectableMenu = ({ onItemSelected }) => {
  const [selectedItem, setSelectedItem] = useState("paraVos");

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    // Call the callback function passed from the parent
    if (onItemSelected) {
      onItemSelected(itemName);
    }
  };

  return (
    <div  className="flex justify-center">
      <ul className="menu menu-sm bg-base-200 rounded-box w-100 menu-horizontal">
        <li className={selectedItem === "ofrecer" ? "active" : ""}>
          <Link to="/new">
            <p
              className={selectedItem === "ofrecer" ? "active" : ""}
              onClick={() => handleItemClick("ofrecer")}
            >
              Ofrecer
            </p>
          </Link>
        </li>

        <li className="disabled">
          <p>|</p>
        </li>

        <li className={selectedItem === "paraVos" ? "active" : ""}>
          <p
            className={selectedItem === "paraVos" ? "active" : ""}
            onClick={() => handleItemClick("paraVos")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="rgba(242, 242, 242, 1)"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="h-5 w-5 "
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path>
            </svg>
            Para vos
          </p>
        </li>

        <li className={selectedItem === "mensajes" ? "active" : ""}>
          <p
            className={selectedItem === "mensajes" ? "active" : ""}
            onClick={() => handleItemClick("mensajes")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="rgba(0, 0, 0, 1)"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 "
            >
              <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
              <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
            </svg>
            Mensajes
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SelectableMenu;
