import React, { useEffect, useState } from "react";
import SideBar from "../Index";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import CategoryModal from "../../../shared/modal/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
// import { deleteCategoryAction } from "../../../Redux/Actions/CategoresAction";
import Loader from "../../../shared/Notification/Loader";
import { Empty } from "../../../shared/Notification/Empty";
import Toast from "../../../shared/Toast";
import { useMutation } from "react-query";
import { deleteCategory } from "../../../api/category";
import { fetchCategories } from "../../../redux/categorySlice/category.slice";
function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  //all categories
  const { categories, loading } = useSelector((state) => state.category);
  const { mutate, isSuccess } = useMutation(deleteCategory, {
    onSuccess: () => {
      Toast({ message: "Deleted success category!", type: "SUCCESS" });
      dispatch(fetchCategories());
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
    setCategory(id);
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isSuccess]);
  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            className="bg-subMain flex-rows gap-4  font-medium transtions hover:bg-main border border-subMain text-white py-2 px-4 rounded   "
            onClick={() => setModalOpen(true)}
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            ondeleteFunction={adminDeleteCategory}
            packagePremium={false}
          />
        ) : (
          <Empty message="You have no categories" />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
