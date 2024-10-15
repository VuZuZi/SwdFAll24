import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function Complete() {
  return (
    <div className="relative">
      <div className="mx-96 my-8 bg-cover object-cover bg-center ">
        <div className="my-16">
          <div className="flex justify-center mb-3">
            <FaCheckCircle className="text-white w-24 h-24" />
          </div>
          <div className="flex justify-center">
            <p>You have successfully registered for a premium account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
