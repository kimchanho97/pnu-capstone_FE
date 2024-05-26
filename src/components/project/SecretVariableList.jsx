import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function SecretVariableList({
  secretVariables,
  setSecretVariables,
}) {
  const [secretVariable, setSecretVariable] = useState({
    key: "",
    value: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSecretVariable((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSecretVariable = () => {
    if (!secretVariable.key || !secretVariable.value) return;
    setSecretVariables((prev) => [...prev, secretVariable]);
    setSecretVariable({
      key: "",
      value: "",
    });
  };

  const handleRemoveSecretVariable = (index) => {
    setSecretVariables((prev) =>
      prev.filter((_, secretVariableIndex) => secretVariableIndex !== index),
    );
  };

  return (
    <div>
      <div className=" flex gap-2 items-center">
        <input
          type="text"
          className="w-full border h-[40px] p-4"
          placeholder="Name"
          name="key"
          value={secretVariable.key}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className="w-full border h-[40px] p-4"
          placeholder="Value"
          name="value"
          value={secretVariable.value}
          onChange={handleInputChange}
        />
        <button onClick={handleAddSecretVariable}>
          <div className=" w-[25px] h-[25px] rounded-full border-2 flex items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white ">
            <FaPlus size={10} />
          </div>
        </button>
      </div>
      {secretVariables.length >= 1 && (
        <div className=" flex gap-2 items-center mt-10 flex-col">
          {secretVariables.map((secretVariable, index) => (
            <div key={index} className=" flex gap-2 items-center w-full">
              <input
                type="text"
                className="w-full border h-[40px] p-4 bg-zinc-100"
                value={secretVariable.key}
                readOnly
              />
              <input
                type="text"
                className="w-full border h-[40px] p-4 bg-zinc-100"
                value={secretVariable.value}
                readOnly
              />
              <button onClick={() => handleRemoveSecretVariable(index)}>
                <div className=" w-[25px] h-[25px] rounded-full border-2 flex items-center justify-center border-red-300 text-red-300 hover:bg-red-300 hover:text-white ">
                  <FaMinus size={10} />
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
