import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../input";
import Uploder from "../../components/Uploader";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import {
//   addCastAction,
//   updateCastAction,
// } from "../../Redux/Actions/MoviesAction";
import { InlineError } from "../Notification/Error";
import { ImagePreview } from "../../components/ImagePreview";
import Toast from "../Toast";
import { addCasts, editCast } from "../../redux/movieSlice/movieSlice";
function CastsModal({ modalOpen, setModalOpen, cast }) {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  //Validate cast
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast name required"),
      })
    ),
  });

  const onSubmit = (data) => {
    //if cast not null then update cast
    if (cast) {
      dispatch(editCast({ ...data, image, id: cast.id }));
      // dispatch(
      //   updateCastAction({
      //     ...data,
      //     image: image,
      //     id: cast.id,
      //   })
      // );
      Toast("Updated Success!!!", "SUCCESS");
    } else {
      //else create cast
      dispatch(
        addCasts({
          ...data,
          image,
          id: generateId,
        })
      );
      Toast("Created cast successfully", "SUCCESS");
    }
    reset();
    setCastImage("");
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border z-100 relative border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              type="text"
              bg={false}
              register={register("name")}
              name="name"
              label="Cast Name"
              placeholder={cast ? cast.name : "Full Name"}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploder setImageUrl={setCastImage} />
            <ImagePreview
              image={image ? image : "/images/user.png"}
              name="cast image"
            />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows  gap-2 py-3 text-lg transtions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CastsModal;
