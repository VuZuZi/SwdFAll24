import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../shared/validation/userValidation";
import Toast from "../shared/Toast";
import { signIn } from "../api/auth";
import { Input } from "../shared/input";
import { InlineError } from "../shared/Notification/Error";
import { FiLogIn } from "react-icons/fi";
import { useMutation } from "react-query";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/userSlice/user.slice";
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowPass, setIsShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser) {
      Toast({
        message: `Welcome to ${currentUser.fullName} Monterhub! `,
        type: "SUCCESS",
      });
    }
  }, [currentUser]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });
  const { mutate, isLoading } = useMutation(signIn, {
    onSuccess: (data) => {
      dispatch(signInSuccess(data));
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  useEffect(() => {
    if (currentUser?.isAdmin) {
      navigate("/dashboard");
    } else if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  //on submit
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <Layout>
      <div className="container mx-auto px-2 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logo1.png"
            alt="logo"
            className="w-full h-12 object-contain "
          />
          <div className="w-full">
            <Input
              label="Email"
              type="email"
              name="email"
              register={register("email")}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>

          <div className="w-full">
            <Input
              label="Password"
              type={isShowPass ? "text" : "password"}
              name="password"
              register={register("password")}
              suffix={
                <span onClick={() => setIsShowPass(!isShowPass)}>
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
          <div className="w-full flex justify-end my-[-12px]">
            <Link
              to={"/forgotPass"}
              className="justify-end mr-2 text-subMain text-sm hover:underline hover:text-gold"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-2 rounded-lg w-full"
          >
            {
              //if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn />
                  Sign In
                </>
              )
            }
          </button>
          <div className="flex gap-3 w-full py-2 border-gray-600 border-2 rounded-lg justify-center items-center bg-white text-gray-400 hover:bg-dry ">
            <img
              className="h-5 w-5 object-cover"
              src="/images/google.png"
              alt="login with google"
            />
            Sign In with Google
          </div>
          <p className="text-center text-border">
            Don't have an account?
            <Link to="/sign-up" className="text-dryGray font-semibold ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default SignIn;
