import React, { useEffect } from "react";
import MainModal from "./MainModal";
import { Input } from "../input";
import { useDispatch } from "react-redux";

import Toast from "../Toast";
import { useMutation } from "react-query";
import { createPackages, updatePackages } from "../../api/packagePremium";
import { fetchPackages } from "../../redux/packageSlice/packageSlice";
import { useForm } from "react-hook-form";
function PackageModal({ modalOpen, setModalOpen, packagePremium }) {
  const dispatch = useDispatch();
  const { register, setValue, handleSubmit, reset } = useForm();
  //Create
  const { mutate, isLoading } = useMutation(createPackages, {
    onSuccess: () => {
      Toast({ message: "Created success Packages!", type: "SUCCESS" });
      dispatch(fetchPackages());
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });

  //Update
  const { mutate: uploadMutate, isLoading: uploading } = useMutation(
    updatePackages,
    {
      onSuccess: () => {
        Toast({ message: "Updated success package!", type: "SUCCESS" });
        dispatch(fetchPackages());
        reset();
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  //create category handler
  const submitHandler = (data) => {
    console.log(data);
    if (packagePremium) {
      uploadMutate({ packageId: packagePremium._id, ...data });
      setModalOpen(false);
    } else {
      mutate({ ...data });
      setModalOpen(false);
    }
  };
  // //useEffect
  useEffect(() => {
    //if category is not null then set title to category title
    if (packagePremium) {
      setValue("name", packagePremium.name);
      setValue("price", packagePremium.price);
      setValue("day", packagePremium.day);
      setValue("discount", packagePremium.discount);
    }
    //if modal is closed then set title to empty
  }, [dispatch, packagePremium, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border z-100 relative border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {packagePremium ? "Update" : "Create"}
        </h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            type="text"
            bg={false}
            label="Category Name"
            placeholder={packagePremium ? packagePremium.title : "Package Name"}
            register={register("name")}
          />
          <Input
            type="number"
            bg={false}
            label="Price"
            placeholder={packagePremium ? packagePremium.price : "Price"}
            register={register("price")}
          />
          <Input
            type="number"
            bg={false}
            label="EXP"
            placeholder={packagePremium ? packagePremium.day : "EXP"}
            register={register("day")}
          />
          <Input
            type="number"
            bg={false}
            label="Discount"
            placeholder={packagePremium ? packagePremium.discount : "Discount"}
            register={register("discount")}
          />
          <button
            type="submit"
            disabled={isLoading || uploading}
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-2 py-3 text-lg transtions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || uploading
              ? "Loading..."
              : packagePremium
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default PackageModal;
