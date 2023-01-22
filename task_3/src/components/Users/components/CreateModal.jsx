import React from "react";
import Modal from "react-modal";
import { CloseIcon } from "../../Icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Modal.scss";
import UploadAndDisplayImage from "../../../hooks/useUpload";
import { postUser } from "../../../services/users";
import moment from "moment";
import { fetchUsersAction } from "../../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
    width: "418px",
  },
};

function CreateModal({ isOpen = false, closeModal = () => {} }) {
  let CurrentDate = moment().format();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      member: "",
      phone: "",
      email: "",
      status: false,
    },
    validationSchema: Yup.object({
      member: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required(" Это поле обязательно к заполнению"),
      phone: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required(" Это поле обязательно к заполнению"),
      email: Yup.string()
        .email("Invalid email address")
        .required(" Это поле обязательно к заполнению"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        ...values,
        photo:
          "https://photar.ru/wp-content/uploads/2019/08/Johansson02_result.jpg",
        operation: CurrentDate,
      };

      postUser(data).then((res) => {
        closeModal();
        dispatch(fetchUsersAction());
        toast.success("Successfully added!");
        resetForm();
      });
    },
  });

  return (
    <div className="modal">
      <Modal style={customStyles} onRequestClose={closeModal} isOpen={isOpen}>
        <div className="d-flex justify-content-between align-items-center py-2">
          <p className="fs-4">Add member</p>
          <span onClick={closeModal} className="pointer">
            <CloseIcon />
          </span>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleName">Name</label>
              <input
                name="member"
                placeholder="Name"
                type="name"
                className="form-control p-3 modal__input"
                id="exampleName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.member}
              />
              {formik.touched.member && formik.errors.member ? (
                <div className="text-danger">
                  <small>{formik.errors.member}</small>
                </div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="examplePhone">Phone</label>
              <input
                name="phone"
                placeholder="Name"
                type="name"
                className="form-control p-3 modal__input"
                id="examplePhone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-danger">
                  <small>{formik.errors.phone}</small>
                </div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleEmail">Email</label>
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="form-control p-3 modal__input"
                id="exampleEmail"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">
                  <small>{formik.errors.email}</small>
                </div>
              ) : null}
            </div>
            <div class="form-check form-switch">
              <label htmlFor="flexSwitchCheckDefault">Status</label>
              <input
                name="status"
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              />
              {formik.touched.status && formik.errors.status ? (
                <div className="text-danger">
                  <small>{formik.errors.status}</small>
                </div>
              ) : null}
            </div>

            <div>
              <UploadAndDisplayImage />
            </div>

            <div className="d-flex justify-content-between w-100 mt-5">
              <button className="btn btn-primary">Save</button>
              <button onClick={closeModal} className="btn btn-light">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CreateModal;
