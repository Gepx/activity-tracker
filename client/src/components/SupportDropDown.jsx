import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SupportDropDown = ({title, description}) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="w-5xl bg-[#212121] text-[#E0E0E0] px-4 py-3 m-auto rounded-md border border-[#333333] shadow-md mb-5">
      <button
        onClick={() => setDropdown(!dropdown)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <span className="text-[#21ab51] font-semibold">{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${dropdown ? "rotate-180" : ""}`}
        />
      </button>

      {/* Konten Dropdown */}
      {dropdown && (
        <div className="mt-2 py-3 text-sm text-gray-400">
            <p 
                onClick={() => setDropdown(!dropdown)}
                className="cursor-pointer"
            > 
                {description}
            </p>
        </div>
      )}
    </div>
  );
};

export default SupportDropDown;
