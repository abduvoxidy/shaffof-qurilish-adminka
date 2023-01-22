import React from "react";
import "./Users.scss";
import { useEffect } from "react";
import { fetchUsersAction } from "../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";
import { deleteUser } from "../../services/users";
import toast from "react-hot-toast";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
  },
};

function Users() {
  const [filters, setFilters] = useState({
    member: undefined,
    email: undefined,
    phone: undefined,
    status: undefined,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [userId, setUserId] = useState();

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (id) => {
    setIsOpen(true);
    setUserId(id);
  };

  const handleDelete = () => {
    deleteUser(userId).then((res) => {
      closeModal();
      dispatch(fetchUsersAction());
      toast.success("Successfully deleted!");
      setUserId(null);
    });
  };

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  const handleSearch = () => {
    const params = {
      ...filters,
      member: filters.member || undefined,
      email: filters.email || undefined,
      phone: filters.phone || undefined,
      status: filters.status || undefined,
    };
    dispatch(fetchUsersAction(params));
  };

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="users">
      <div className=" d-flex justify-content-between">
        <div className="p-3 bg-white d-flex justify-content-between shadow-sm  users__select">
          <p>Members</p>
          <p>Admins</p>
        </div>
        <button onClick={() => setCreateModal(true)} className="users__btn">
          Add member
        </button>
      </div>
      <div className="d-flex gap-3 mt-4">
        <input
          name="member"
          onChange={handleChange}
          placeholder="Name"
          type="text"
          className="users__input"
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="text"
          className="users__input"
        />
        <input
          name="phone"
          onChange={handleChange}
          placeholder="Phone"
          type="text"
          className="users__input"
        />
        <select
          name="status"
          onChange={handleChange}
          placeholder="Select-status"
          defaultValue={"1"}
          className="form-select"
          style={{ width: "184px" }}
        >
          <option value="">Open this select menu</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <button onClick={handleSearch} className=" users__btn">
          Search
        </button>
      </div>
      <div className="mt-3">
        <table className="table border bg-white shadow-sm">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Member Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Status</th>
              <th>Operation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length &&
              users.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img width={40} src={item.photo} alt={item.photo} />
                  </td>
                  <td>{item.member}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.status ? (
                      <span className="rounded text-white px-2 py-1 bg-success">
                        Active
                      </span>
                    ) : (
                      <span className="bg-danger text-white px-2 py-1 rounded">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td>{item.operation}</td>
                  <td>
                    <div className="d-flex ">
                      <button
                        onClick={() => openModal(item.id)}
                        className="btn"
                      >
                        <img
                          width={20}
                          src="https://www.clipartmax.com/png/full/340-3407822_clip-art-library-trash-can-icon-free-download-png-and-icon-delete.png"
                          alt=""
                        />
                      </button>{" "}
                      <button
                        onClick={() => {
                          setUpdateModal(true);
                          setUserId(item.id);
                        }}
                        className="btn"
                      >
                        <img
                          width={30}
                          src="https://w7.pngwing.com/pngs/253/411/png-transparent-black-and-white-illustration-computer-icons-editing-graphics-editor-edit-pen-write-icon-miscellaneous-angle-pencil.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        onRequestClose={closeModal}
        style={customStyles}
        isOpen={modalIsOpen}
      >
        <div className="d-flex flex-column align-items-center p-3 px-5">
          <h5>Are you sure to delete this member? </h5>
          <div className="d-flex gap-4 mt-3">
            <button
              onClick={handleDelete}
              style={{ width: "75px" }}
              className="btn btn-sm  btn-primary"
            >
              Ok
            </button>
            <button
              onClick={closeModal}
              style={{ width: "75px" }}
              className="btn btn-sm btn-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <CreateModal
        isOpen={createModal}
        closeModal={() => setCreateModal(false)}
      />
      <UpdateModal
        userId={userId}
        isOpen={updateModal}
        closeModal={() => setUpdateModal(false)}
      />
    </div>
  );
}

export default Users;
