import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Dashboard.scss";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
  },
};

function Dashboard() {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const isUser = localStorage.getItem("user");

  useEffect(() => {
    if (isUser) {
      navigate("/users");
    } else {
      navigate("/login");
    }
  }, [isUser]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid d-flex justify-content-between align-items-center  dashboard__header">
          <h3 className="text-white">SHAFFOF QURILISH</h3>
          <div
            onClick={() => navigate("/profile")}
            className="d-flex align-items-center gap-2 cursor-pointer"
          >
            <p className="text-white">John Doe</p>
            <img
              width={40}
              className="rounded"
              src="https://yt3.ggpht.com/ytc/AKedOLRGjKiB59BU5tbFpleJJbEdvy6w7VzopbQ5BSTP=s900-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          </div>
        </div>

        <div className="w-100 position-relative">
          <div className="sidebar">
            <div>
              <Link to="/users" className="text-decoration-none">
                <p className="text-white fs-5 mt-2">Users</p>
              </Link>
              <Link to="/profile" className="text-decoration-none">
                <p className="text-white fs-5 mt-2">Profile</p>
              </Link>
              <Link
                onClick={() => setIsOpen(true)}
                className="text-decoration-none"
              >
                <p className="text-white fs-5 mt-2">Logout</p>
              </Link>
            </div>
          </div>
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
      <Modal
        onRequestClose={closeModal}
        style={customStyles}
        isOpen={modalIsOpen}
      >
        <div className="d-flex flex-column align-items-center p-3 px-5">
          <h5>Saytdan chiqishni tasdiqlaysizmi? </h5>
          <div className="d-flex gap-4 mt-3">
            <button
              onClick={logout}
              style={{ width: "75px" }}
              className="btn btn-sm  btn-primary"
            >
              Ha
            </button>
            <button
              onClick={closeModal}
              style={{ width: "75px" }}
              className="btn btn-sm btn-light"
            >
              Yo'q
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Dashboard;
