import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser, deleteUser, updateUser } from "../actions/userActions";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [isEditMode, setIsEditMode] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      dob: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      mobile: Yup.string().required("Required").min(10).max(10),
      dob: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditMode) {
        const updatedUser = { ...userToUpdate, ...values };
        dispatch(updateUser(updatedUser));
        setIsEditMode(false);
        setUserToUpdate(null);
      } else {
        const newUser = { id: new Date().getTime().toString(), ...values };
        dispatch(addUser(newUser));
      }
      resetForm();
    },
  });

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (user) => {
    setIsEditMode(true);
    setUserToUpdate(user);
    formik.setValues({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      dob: user.dob,
      address: user.address,
    });
  };

  return (
    <div>
      <div className="card w-50 mx-auto mt-4">
        <div className="card-body">
          <h5 className="card-title text-center">{isEditMode ? "Edit User Data" : "Add User Data"}</h5>
          <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className={`form-control ${formik.touched.mobile && formik.errors.mobile ? "is-invalid" : ""}`}
                id="mobile"
                name="mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="invalid-feedback">{formik.errors.mobile}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.dob && formik.errors.dob ? "is-invalid" : ""}`}
                id="dob"
                name="dob"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
              />
              {formik.touched.dob && formik.errors.dob && (
                <div className="invalid-feedback">{formik.errors.dob}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className={`form-control ${formik.touched.address && formik.errors.address ? "is-invalid" : ""}`}
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="invalid-feedback">{formik.errors.address}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary float-end">
              {isEditMode ? "Update User" : "Add User"}
            </button>
            {isEditMode && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setIsEditMode(false);
                  setUserToUpdate(null);
                  formik.resetForm();
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="card m-4">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.users.length !== 0 && (
                <>
                  {users?.users?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.dob}</td>
                      <td>{user.address}</td>
                      <td>
                        <button className="btn btn-primary me-2" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
