import React, { useCallback } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { selectedPackageRegister } from "../../redux/packageSlice/packageSlice";
export const renderBenefit = (benefit) => {
  return Object.entries(benefit).map(([key, value]) => (
    <div key={key} className="flex gap-2">
      <div>
        {value ? (
          <TiTick className="text-gold" />
        ) : (
          <RxCross2 className="text-red-600" />
        )}
      </div>
      <p>{key}</p>
    </div>
  ));
};
function Package() {
  const dispatch = useDispatch();
  const { packages, premiumChoose } = useSelector((state) => state.package);
  const handlePackageClick = (packageId) => {
    dispatch(selectedPackageRegister(packageId));
  };
  const renderPackage = useCallback(
    (premium, index) => {
      return (
        <div
          key={index}
          className={`py-4 h-fit border border-borde rounded-lg hover:bg-subMain ${
            premiumChoose === premium._id ? "bg-subMain" : ""
          } `}
          onClick={() => handlePackageClick(premium._id)}
        >
          <div className=" flex-colo">
            <p className="text-white font-bold text-2xl">{premium.name}</p>
            <div className="flex gap-4 justify-center">
              {premium.discount !== 0 && (
                <p className="text-gray-500 line-through">{premium.price}$</p>
              )}
              <p className="font-semibold">
                {premium.price - (premium.price * premium.discount) / 100}$
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">
                expired day: {premium.day} Days
              </p>
            </div>
          </div>
        </div>
      );
    },
    [premiumChoose]
  );
  return (
    <div className="grid grid-cols-3 mx-32 gap-6 my-6">
      {packages.map((premium, index) => {
        return renderPackage(premium, index);
      })}
    </div>
  );
}

export default Package;
