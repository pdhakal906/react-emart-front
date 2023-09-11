import React from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUserLoginMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUserToLocal } from '../../features/userInfo';



const Login = () => {


  const loginSchema = Yup.object().shape({


    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),


  });

  const nav = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading, isError, error, isSuccess }] = useUserLoginMutation();




  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: async (val) => {
      console.log('logged in')
      try {

        const response = await loginUser(val).unwrap();
        dispatch(addUserToLocal(response));
        toast.success('sucessfully logged in');
        nav(-1);
        // console.log(response);

      } catch (err) {

        toast.error(err.data.message)
      }
    },
    validationSchema: loginSchema
  });




  return (
    <Card color="transparent" shadow={false} className='mx-auto max-w-sm mt-20'>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 mb-5 font-normal">
        Enter your details to login.
      </Typography>
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-4 flex flex-col gap-6">

          <Input
            size="lg"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && <h1 className="text-red-600" >{formik.errors.email}</h1>}


          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && <h1 className="text-red-600" >{formik.errors.password}</h1>}

        </div>

        {isLoading ? <Button type='submit' className='mt-6' fullWidth>
          <div className='h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto'></div>
        </Button> : <Button type='submit' className='mt-6 bg-orange-500' fullWidth>Submit</Button>}


        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{"  "}
          <button type='button' onClick={() => nav('/user/signup')}>
            <h1
              className="font-medium text-orange-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </h1>
          </button>
        </Typography>
      </form>
    </Card>
  );

}

export default Login