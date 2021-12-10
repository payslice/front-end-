import React, { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { BsThreeDotsVertical } from "react-icons/bs";

const OptionsMenu = ({ options, param }) => {
  const [show, setShow] = useState(false);

  const tdc = useRef();
  useClickOutside(tdc, () => {
    setShow(false);
  });

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div
      ref={tdc}
      style={{ position: "relative", left: "" }}
      className="w-16 relative my-auto"
    >
      <BsThreeDotsVertical onClick={handleToggle} />
      {show && (
        <ul
          style={{ top: "120%", left: "", textAlign: "left" }}
          className="bg-white z-10 w-32 border border-gray-200 text-left rounded text-xs absolute "
        >
          {options?.map((option, i) => {
            return (
              <li
                key={i}
                onClick={() => option.onClick(param)}
                className="hover:bg-gray-100  py-3 px-4 border-gray-200 cursor-pointer"
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OptionsMenu;
