import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SupportBox = ({icon, title, description}) => {
  return (
    <div className="support-box bg-[#2D2D2D] max-w-xs h-fit p-4 flex flex-col items-center justify-center rounded-md cursor-pointer">
      <FontAwesomeIcon icon={icon} size='5x' style={{ color: "#21ab51" }} />
      <h1 className='mt-4 mb-3 font-bold text-lg text-neutral-50'>{title}</h1>
      <p className='text-center text-gray-400 font-semibold'>{description}</p>
    </div>
  )
}

export default SupportBox