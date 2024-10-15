import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../input";
import { useDispatch, useSelector } from "react-redux";

import Toast from "../Toast";
import { useMutation } from "react-query";
import { createCategory, updateCategory } from "../../api/category";
import { fetchCategories } from "../../redux/categorySlice/category.slice";
function CategoryModal({ modalOpen, setModalOpen, category }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  //Create
  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: () => {
      Toast({ message: "Created success category!", type: "SUCCESS" });
      dispatch(fetchCategories());
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });

  //Update
  const { mutate: uploadMutate, isLoading: uploading } = useMutation(
    updateCategory,
    {
      onSuccess: () => {
        Toast({ message: "Updated success category!", type: "SUCCESS" });
        dispatch(fetchCategories());
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  //create category handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      if (category) {
        uploadMutate({ categoryId: category._id, title: title });
        setModalOpen(false);
      } else {
        mutate({ title: title });
        setTitle("");
        setModalOpen(false);
      }
    } else {
      Toast({ message: "Please write a category name ", type: "ERROR" });
    }
  };
  //useEffect
  useEffect(() => {
    //if category is not null then set title to category title
    if (category) {
      setTitle(category?.title);
    }
    //if modal is closed then set title to empty
    if (modalOpen === false) {
      setTitle("");
    }
  }, [dispatch, category, modalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border z-100 relative border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            type="text"
            bg={false}
            label="Category Name"
            placeholder={category ? category.title : "Category Name"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || uploading}
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-2 py-3 text-lg transtions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || uploading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
