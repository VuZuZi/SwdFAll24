import React, { useEffect, useState } from "react";
import { LiaFileContractSolid } from "react-icons/lia";

function TermAndConditions() {
  return (
    <div>
      <div className="mx-96 my-6 border-border border-2 rounded w-[700px]">
        <div className="flex justify-center gap-5 my-2">
          <LiaFileContractSolid className="text-subMain w-8 h-8" />
          <p className="text-lg font-semibold">Terms and Conditions</p>
        </div>
        <div className="border-border border-b-2 my-2"></div>
        <div className="overflow-y-auto h-[300px] py-4 px-8">
          <p className="font-medium">1. Acceptance of Terms </p>
          <p className="text-gray-400">
            By accessing or using the website, you fully agree and accept all
            the terms and conditions outlined below.
          </p>
          <p className="font-medium">2. Compliance with Laws</p>
          <p className="text-gray-400">
            You commit to using our website in compliance with all applicable
            laws and regulations.
          </p>
          <p className="font-medium">3. Rights and Responsibilities</p>
          <p className="text-gray-400">
            3.1 We reserve the right to change, modify, or terminate any
            services we provide without prior notice.
          </p>
          <p className="text-gray-400">
            3.2 You are responsible for maintaining the security of your login
            information and not sharing it with others.
          </p>
          <p className="font-medium">4. Copyright</p>
          <p className="text-gray-400">
            All content on this website is our property and is protected by
            copyright law.
          </p>
          <p className="font-medium">5. Privacy Rights</p>
          <p className="text-gray-400">
            We are committed to protecting your personal information and using
            it only for the purposes described in the Privacy Policy.
          </p>
          <p className="font-medium">6. Limitation of Liability</p>
          <p className="text-gray-400">
            We are not liable for any loss or damage arising from the use of the
            website or related services.
          </p>
          <p className="font-medium">7. Changes to Terms</p>
          <p className="text-gray-400">
            We reserve the right to change these terms and conditions at any
            time without prior notice. Your continued use implies acceptance of
            these changes.
          </p>
        </div>
        <div className="flex justify-end mr-12 gap-2 py-4">
          <input type="checkbox" />
          <p> I agree with terms and conditions</p>
        </div>
      </div>
    </div>
  );
}

export default TermAndConditions;
