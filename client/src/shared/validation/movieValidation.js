import * as yup from "yup";

export const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(10, "Comment should be less than 200 characters"),
  rating: yup.number().required("Select a rating "),
});

export const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a movie name")
    .max(100, "Movie name should be lees than 100 characties"),
  time: yup.number().required("Please enter a movie duration"),
  language: yup.string().required("Please enter a movie language"),
  year: yup.number().required("Please enter a movie year"),
  category: yup.string().required("Please select movie category"),
  des: yup
    .string()
    .required("Please enter a movie description")
    .max(500, "Movie description should be less than 500 charactiers"),
});
