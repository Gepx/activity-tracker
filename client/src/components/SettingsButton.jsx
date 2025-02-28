import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SettingsButton = ({ icon, title, description, onClick, darkMode }) => {
  return (
    <div className="settings-button max-w-123 pl-3 pr-3 pt-3 rounded-xl flex hover:text-gray-600 cursor-pointer" onClick={onClick}>
      <div className="left-settings-button">
        <FontAwesomeIcon
          icon={icon}
          className={`p-2 rounded-lg text-xl min-w-5 
                  ${darkMode ? 'bg-gray-700 text-white' : 'null'}`}
        />
      </div>
      <div className="middle-settings-button ml-3 pt-1 text-lg min-w-100">
        <p className="font-semibold mb-2">{title}</p>
        <p className="relative">
          {description}
          <span
            className={`block w-[105%] mt-3 border-b-2 
                  ${darkMode ? 'border-gray-500 opacity-50' : 'border-gray-300 opacity-50'}`}
          ></span>
        </p>
      </div>
      <div className="right-settings-button pt-1 text-lg">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export default SettingsButton;
