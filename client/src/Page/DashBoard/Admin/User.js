import React, { useEffect } from "react";
import SideBar from "../Index";
import Table2 from "../../../components/Table2";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../shared/Toast";
// import {
//   deleteUserAction,
//   getAllUsersAction,
// } from "../../../Redux/Actions/userActions";
import Loader from "../../../shared/Notification/Loader";
import { Empty } from "../../../shared/Notification/Empty";
import { fetchAllUser, resetUser } from "../../../redux/userSlice/user.slice";
import { useMutation } from "react-query";
import { deleteProfile } from "../../../api/auth";

function Users() {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.user);
  const { mutate, isSuccess: deleteSuccess } = useMutation(deleteProfile, {
    onSuccess: () => {
      Toast({ message: "Deleted success User", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      mutate(id);
    }
  };
  //useEffect
  useEffect(() => {
    dispatch(fetchAllUser());
    if (error) {
      Toast({ message: error, type: "ERROR" });
      dispatch(resetUser());
    }
  }, [dispatch, error, deleteSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>

        {loading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            ondeleteFunction={deleteUserHandler}
            packagePremium={false}
          />
        ) : (
          <Empty message="No Users" />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
