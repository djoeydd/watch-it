import React, { useState, useEffect } from "react";

const DropdownMenu = ({
  buttonText,
  menuItems,
  selectedItem,
  setSelectedItem,
  isOpen,
  setOpenDropdown,
}) => {
  const toggleDropdown = () => {
    setOpenDropdown();
  };

  const handleItemClick = (item) => {
    item.onClick();
    setOpenDropdown();
  };

  return (
    <div className="relative inline-block text-left rounded-md text-nowrap">
      <div
        className={`border-transparent rounded-l ${
          selectedItem ? `shadow-neon-purple` : ``
        }`}
      >
        <button
          type="button"
          className="inline-flex bottom-0 w-full rounded-md  border-purple-800 shadow-sm px-2 py-1 bg-gray-900 text-xs font-medium text-gray-300 hover:bg-gradient-to-r from-purple-800 to-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-800 z-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {buttonText}
          <svg
            className="-mr-1 ml-2 h-4 w-4 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`grid origin-top-right absolute mx-auto mt-2 w-fill left-0 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none transform transition ease-in-out duration-300 z-50 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {isOpen && (
          <div
            className="my-1 border-l border-r border-b  bg-gray-900 rounded-xl max-h-36 overflow-y-scroll w-fit"
            role="none"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className={`text-gray-300 flex px-4 py-2 text-xs w-full  hover:bg-purple-800 text-left ${
                  selectedItem === item ? "bg-purple-800" : ""
                }`}
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${index}`}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
