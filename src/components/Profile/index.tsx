"use client";

import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  image: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios.get('https://dummyjson.com/users/1')
      .then(response => {
        const { id, firstName, lastName, maidenName, age, gender, email, image } = response.data;
        setUser({ id, firstName, lastName, maidenName, age, gender, email, image });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    maidenName: Yup.string().required('Maiden Name is required'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = (values: UserProfile) => {
    if (!user) return;

    axios.put(`https://dummyjson.com/users/${user.id}`, values)
      .then(response => {
        setUser(response.data);
        setEditMode(false);
        toast.success('Profile updated successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        toast.error('Failed to update profile. Please try again.', {
          position:"top-center",
          autoClose: 3000,
        });
      });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          {editMode ? (
            <Formik
              initialValues={user}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maidenName">
                      Maiden Name
                    </label>
                    <Field
                      id="maidenName"
                      name="maidenName"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="maidenName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                      Age
                    </label>
                    <Field
                      id="age"
                      name="age"
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                      Gender
                    </label>
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <img src={user.image} alt="User Image" className="rounded-full w-24 h-24 mb-4 mx-auto" />
                <p className="text-gray-700 text-base mb-2"><strong>First Name:</strong> {user.firstName}</p>
                <p className="text-gray-700 text-base mb-2"><strong>Last Name:</strong> {user.lastName}</p>
                <p className="text-gray-700 text-base mb-2"><strong>Maiden Name:</strong> {user.maidenName}</p>
                <p className="text-gray-700 text-base mb-2"><strong>Age:</strong> {user.age}</p>
                <p className="text-gray-700 text-base mb-2"><strong>Gender:</strong> {user.gender}</p>
                <p className="text-gray-700 text-base mb-2"><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage
