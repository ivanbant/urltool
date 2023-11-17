import { useState } from "react";

function Select(props) {
  const { options, selected, setSelected } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected.label || "Select..."}
        </button>
      </div>

      <div
        className={`absolute left-0 top-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          isOpen ? "block z-30" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          {options.map((option) => (
            <a
              key={option.value}
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left cursor-pointer select-none hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Select;
