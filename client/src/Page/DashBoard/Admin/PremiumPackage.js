import React, { useEffect, useState } from "react";
import SideBar from "../Index";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/Notification/Loader";
import { Empty } from "../../../shared/Notification/Empty";
import Toast from "../../../shared/Toast";
import { useMutation } from "react-query";
import { deleteCategory } from "../../../api/category";
import { fetchCategories } from "../../../redux/categorySlice/category.slice";
import { fetchPackages } from "../../../redux/packageSlice/packageSlice";
import { deletePackages } from "../../../api/packagePremium";
import PackageModal from "../../../shared/modal/PackageModal";
function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [packagePremium, setPackage] = useState();
  const dispatch = useDispatch();

  //all categories
  const { packages, loading } = useSelector((state) => state.package);
  const { mutate, isSuccess } = useMutation(deletePackages, {
    onSuccess: () => {
      Toast({ message: "Deleted success Packages!", type: "SUCCESS" });
      dispatch(fetchPackages());
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  //delete categries
  //   const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you sure want to delete this category ?")) {
      mutate(id);
    }
  };
  const OnEditFunction = (id) => {
    setPackage(id);
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    if (modalOpen === false) {
      setPackage();
    }
  }, [modalOpen, dispatch, isSuccess]);
  return (
    <SideBar>
      <PackageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        packagePremium={packagePremium}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Package Premium</h2>
          <button
            className="bg-subMain flex-rows gap-4  font-medium transtions hover:bg-main border border-subMain text-white py-2 px-4 rounded   "
            onClick={() => setModalOpen(true)}
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : packages?.length > 0 ? (
          <Table2
            data={packages}
            users={false}
            OnEditFunction={OnEditFunction}
            ondeleteFunction={adminDeleteCategory}
            packagePremium={true}
          />
        ) : (
          <Empty message="You have no Packages" />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
