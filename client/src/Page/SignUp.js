import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../shared/validation/userValidation";
import { Input } from "../shared/input";
import { InlineError } from "../shared/Notification/Error";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { FiLogIn } from "react-icons/fi";
import { signUp } from "../api/auth";
import { useMutation } from "react-query";
import Toast from "../shared/Toast";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice/user.slice";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  //validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });
  //on submit
  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: async (data) => {
      dispatch(signInSuccess(data));
      Toast({ message: "Register Account Success !!!", type: "SUCCESS" });
    },
    onError: (error) => {
      console.error("Login Error:", error);
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  //on submit
  const onSubmit = (data) => {
    mutate(data);
  };
  //useEffect
  useEffect(() => {
    if (currentUser?.isAdmin) {
      navigate("/dashboard");
    } else if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleShowPass = (field) => {
    if (field === "password") {
      setIsShowPass(!isShowPass);
    }
    if (field === "confirmPassword") {
      setIsShowConfirm(!isShowConfirm);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-2 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-6 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <div>
            <img
              src="/images/logo1.png"
              alt="logo"
              className="w-full h-12 object-contain "
            />
            <div className="text-3xl font-bold">Create your account</div>
          </div>

          <div className="w-full">
            <Input
              label="Email Address"
              type="text"
              name="email"
              register={register("email")}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Full Name"
              type="text"
              name="name"
              register={register("name")}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex w-full gap-3">
            <div className="w-full">
              <Input
                label="Phone Number"
                type="text"
                name="phone"
                register={register("phone")}
              />
              {errors.phone && <InlineError text={errors.phone.message} />}
            </div>
            <div className="w-full">
              <Input
                label="Birth Day"
                type="date"
                name="dob"
                register={register("dob")}
              />
              {errors.dob && <InlineError text={errors.dob.message} />}
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Password"
              type={isShowPass ? "text" : "password"}
              name="password"
              register={register("password")}
              suffix={
                <span onClick={() => handleShowPass("password")}>
                  {isShowPass ? (
                    <LuEyeOff className="w-4 h-4" />
                  ) : (
                    <LuEye className="w-4 h-4" />
                  )}
                </span>
              }
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Confirm Password"
              type={isShowConfirm ? "text" : "password"}
              name="confirmPassword"
              register={register("confirmPassword")}
              suffix={
                <span onClick={() => handleShowPass("confirmPassword")}>
                  {isShowConfirm ? (
                    <LuEyeOff className="w-4 h-4" />
                  ) : (
                    <LuEye className="w-4 h-4" />
                  )}
                </span>
              }
            />
            {errors.confirmPassword && (
              <InlineError text={errors.confirmPassword.message} />
            )}
          </div>
          <div className="w-full flex-rows gap-1 items-center ">
            <input name="term" type="checkbox" {...register("term")} />
            <p className={`text-sm ${errors?.term && "text-red-600"}`}>
              By creating an account, I agree to the terms and conditions.
            </p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-3 rounded-lg w-full"
          >
            {
              //if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn />
                  Sign Up
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Already have an account?
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>{" "}
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default SignUp;
