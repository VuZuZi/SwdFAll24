import React, { useEffect, useState } from "react";
import SideBar from "./Index";
import Uploder from "../../components/Uploader";
import { Input } from "../../shared/input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../shared/Notification/Error";
import Toast from "../../shared/Toast";
import { ProfileValidation } from "../../shared/validation/userValidation";
import { ImagePreview } from "../../components/ImagePreview";
import { useMutation } from "react-query";
import { deleteProfile, uploadProfile } from "../../api/auth";
import { signInSuccess } from "../../redux/userSlice/user.slice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState(
    currentUser ? currentUser.avatar : " "
  );
  // const { isLoading, isError, isSuccess } = useSelector(
  //   (state) => state.userUpdateProfile
  // );
  // const { isLoading: deleteLoading, isError: deleteError } = useSelector(
  //   (state) => state.userDeleteProfile
  // );
  //validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });
  //update profile

  const {
    mutate: mutateUpdate,
    isError: updateError,
    isLoading: updateLoading,
  } = useMutation(uploadProfile, {
    onSuccess: (data) => {
      Toast({ message: "Updated Successed!!!", type: "SUCCESS" });
      dispatch(signInSuccess(data));
    },
    onError: (error) => {
      Toast(error.message, "ERROR");
    },
  });
  const {
    mutate: mutateDelete,
    isError: deleteError,
    isLoading: deleteLoading,
  } = useMutation(deleteProfile, {
    onSuccess: (data) => {
      Toast({ message: "Deleted Success", type: "SUCCESS" });
      dispatch(signInSuccess(null));
      navigate("/signin");
    },
    onError: (error) => {
      Toast(error.message, "ERROR");
    },
  });
  const onSubmit = (data) => {
    mutateUpdate({ ...data, image: imageUrl });
  };

  //Delete Profile
  const onClickDeleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?") &&
      mutateDelete();
  };
  // useEffect
  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser?.fullName);
      setValue("email", currentUser?.email);
      setValue("bod", currentUser?.bod);
      setValue("phone", currentUser?.phone);
    }
    if (updateError || deleteError) {
      Toast(updateError, "ERROR");
    }
  }, [currentUser, setValue, updateError, dispatch, deleteError]);
  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          {/*Image preview */}
          <div className="col-span-2">
            <ImagePreview name={currentUser.name} image={imageUrl} />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="Full Name"
            type="text"
            name="name"
            register={register("name")}
            bg={true}
          />
          {errors.name && <InlineError text={errors.name.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex w-full gap-3">
          <div className="w-full">
            <Input
              label="Phone Number"
              type="text"
              name="phone"
              register={register("phone")}
              bg={true}
            />
            {errors.phone && <InlineError text={errors.phone.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Birth Day"
              type="date"
              name="dob"
              register={register("dob")}
              bg={true}
              required={false}
            />
            {errors.dob && <InlineError text={errors.dob.message} />}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={onClickDeleteProfile}
            disabled={deleteLoading || updateLoading}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto "
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button
            disabled={deleteLoading || updateLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto "
          >
            {updateLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
