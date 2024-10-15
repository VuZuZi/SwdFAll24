import React from "react";
import SideBar from "./Index";
import { Input } from "../../shared/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordValidation } from "../../shared/validation/userValidation";
import { InlineError } from "../../shared/Notification/Error";
import Toast from "../../shared/Toast";
import { useMutation } from "react-query";
import { changePassword } from "../../api/auth";
function ChangePassword() {
  const { mutate, isLoading } = useMutation(changePassword, {
    onSuccess: (data) => {
      Toast({ message: "Changed Password Success", type: "SUCCESS" });
      reset();
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  //validate user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });
  //   //on submit
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full">
          <Input
            label="Old Password"
            placeholder="*******"
            type="password"
            name="oldPassword"
            register={register("oldPassword")}
            bg={true}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="New Password"
            placeholder="*******"
            type="password"
            name="newPassword"
            register={register("newPassword")}
            bg={true}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Confirm Password"
            placeholder="*******"
            type="password"
            name="confirmPassword"
            register={register("confirmPassword")}
            bg={true}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto "
          >
            {isLoading ? "Changing... " : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default ChangePassword;
