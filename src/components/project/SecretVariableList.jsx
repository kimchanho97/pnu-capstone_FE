import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

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
          <CiCirclePlus className=" w-[30px] h-[30px] text-blue-500" />
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
                <CiCircleMinus className=" w-[30px] h-[30px] text-red-300" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
