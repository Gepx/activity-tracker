import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SettingsButton = ({icon, title, description}) => {
  return (
    // <div className='settings-button max-w-123 p-3 rounded-xl text-gray-200 flex hover:text-white cursor-pointer'>
    <div className='settings-button max-w-123 pl-3 pr-3 pt-3 rounded-xl text-black flex hover:text-gray-600 cursor-pointer'>
        <div className="left-settings-button">
            <FontAwesomeIcon 
                icon={icon} 
                // className='p-2 rounded-lg bg-[#212121] text-xl' 
                className='p-2 rounded-lg bg-gray-200 text-xl min-w-5' 
            />
        </div>
        <div className="middle-settings-button ml-3 pt-1 text-lg min-w-100">
            <p className='font-semibold mb-2'>{title}</p>
            <p className="relative">
                {description}
                <span className="block w-[105%] mt-3 border-b-2 border-[#323444] opacity-50"></span>
            </p>
            
        </div>
        <div className="right-settings-button pt-1 text-lg">
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    </div>
  )
}

export default SettingsButton