import React from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router';
import { useUserSignUpMutation } from '../../features/auth/authApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';




const SignUp = () => {



  const signUpSchema = Yup.object().shape({

    fullname: Yup.string().required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    image: Yup.mixed().test('fileType', 'Invalid file type', (value) =>
      value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    ).test('fileSize', 'File too large', (value) =>
      value && value.size <= 5 * 1024 * 1024
    ),

  });

  const nav = useNavigate();
  const [signUpUser, { isLoading, isError, error, isSuccess }] = useUserSignUpMutation();




  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      image: null,
      preview: ''
    },

    onSubmit: async (val) => {
      let formData = new FormData();
      formData.append('fullname', val.fullname);
      formData.append('email', val.email);
      formData.append('password', val.password);
      formData.append('image', val.image);


      try {

        const response = await signUpUser({
          body: formData
        });
        toast.success('sucessfully signed up')
        nav(-1)

      } catch (err) {
        console.log(err)
        toast.error(err.data.message)
      }
    },
    validationSchema: signUpSchema
  });




  return (
    <Card color="transparent" shadow={false} className='mx-auto max-w-sm mt-20'>
      <Typography variant="h4" color="blue-gray">
        Signup
      </Typography>
      <Typography color="gray" className="mt-1 mb-5 font-normal">
        Enter your details to Signup.
      </Typography>
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Full Name"
            name="fullname"
            onChange={formik.handleChange}
            value={formik.values.fullname}
          />
          {formik.errors.fullname && formik.touched.fullname && <h1 className="text-red-600" >{formik.errors.fullname}</h1>}

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
        <div>
          <p>Select an Image</p>
          <input
            name='image'
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('image', file);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.addEventListener('load', () => {
                formik.setFieldValue('preview', reader.result);
              })
            }} type="file" />
          {formik.errors.image && formik.touched.image ? <h1 className='mt-2 text-red-600'>{formik.errors.image}</h1> : null}
          <div className='border border-gray-600 h-[150px] my-1 w-full'>
            {formik.values.preview !== null && <img src={formik.values.preview} alt="" className='object-cover h-full w-full' />}
          </div>
        </div>

        {isLoading ? <Button type='submit' className='mt-6' fullWidth>
          <div className='h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto'></div>
        </Button> : <Button type='submit' className='mt-6' fullWidth>Submit</Button>}


        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{"  "}
          <button type='button' onClick={() => nav('/user/login')}>
            <h1
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Login
            </h1>
          </button>
        </Typography>
      </form>
    </Card>
  )
}

export default SignUp