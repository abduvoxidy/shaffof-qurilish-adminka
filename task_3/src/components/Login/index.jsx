import React from "react";
import "./Login.scss";
import logoImg from "../../images/logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required(" Это поле обязательно к заполнению"),
      contact: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required(" Это поле обязательно к заполнению"),
      email: Yup.string()
        .email("Invalid email address")
        .required(" Это поле обязательно к заполнению"),
    }),
    onSubmit: (values) => {
      if (values) {
        localStorage.setItem("user", true);
        return navigate("/users");
      }
    },
  });

  return (
    <div className="login">
      <div className="row bg-white h-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={formik.handleSubmit} className="w-50 ">
            <div>
              <h2 className="text-secondary text-center">LOGIN</h2>
            </div>

            <div className="mb-3 mt-5">
              <input
                name="name"
                placeholder="Name"
                type="name"
                className="form-control p-3 login__input"
                id="exampleName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">
                  <small>{formik.errors.name}</small>
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              <input
                name="contact"
                placeholder="Contact"
                type="contact"
                className="form-control p-3 login__input"
                id="contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.touched.contact && formik.errors.contact ? (
                <div className="text-danger">
                  <small>{formik.errors.contact}</small>
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="form-control p-3 login__input"
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

            <button
              type="submit"
              className="btn btn-primary w-100 p-2 mt-3 login__btn"
            >
              Login
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center login__right">
          <img className="mw-100" src={logoImg} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Login;
