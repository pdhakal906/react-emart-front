import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { useUserUpdateMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from '../../features/userInfo';

const UpdateForm = ({ user }) => {
  console.log(user.shippingAddress.address)
  const [updateUser, { isLoading, isError, error }] = useUserUpdateMutation();
  const { userInfo } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();

  const userSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    fullname: Yup.string().min(5).max(20).required('Required')
  })


  const formik = useFormik({
    initialValues: {
      fullname: user?.fullname,
      email: user?.email,
      address: user?.shippingAddress.address,
      city: user?.shippingAddress.city
    },
    onSubmit: async (val) => {
      console.log(val)
      try {
        await updateUser({
          email: val.email,
          fullname: val.fullname,
          token: userInfo.token,
          body: {
            address: val.address,
            city: val.city,
            isEmpty: false
          }

        }).unwrap();

        dispatch(userUpdate({
          email: val.email,
          fullname: val.fullname,
          shippingAddress: {
            address: val.address,
            city: val.city
          }
        }));

        toast.success('user updated');

      } catch (err) {
        toast.error(err.data.message);
      }
    },
    validationSchema: userSchema
  })


  return (
    <>
      <Card className='bg-white rounded-none p-5 w-full' shadow={false}>
        <Typography variant='h4' color='blue-gray'>
          Profile
        </Typography>
        <form onSubmit={formik.handleSubmit} className='mt-8 mb-2'>
          <div className='mb-4 flex flex-col gap-6'>
            <Input
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              size="lg"
              label="Email"
            />

            {formik.errors.email && formik.touched.email && <h1 className='text-red-500'>{formik.errors.email}</h1>}
            <Input
              name='fullname'
              onChange={formik.handleChange}
              value={formik.values.fullname}
              size="lg"
              label="Full Name"
            />

            {formik.errors.fullname && formik.touched.fullname && <h1 className='text-red-500'>{formik.errors.fullname}</h1>}
            <Input
              name='address'
              type='text'
              size="lg" label="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />

            {formik.errors.address && formik.touched.address && <h1 className='text-red-700'>{formik.errors.address}</h1>}

            <Input
              name='city'
              type="text"
              size="lg"
              label="City"

              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik.errors.city && formik.touched.city && <h1 className='text-red-700'>{formik.errors.city}</h1>}

          </div>


          <Button type='submit' className='bg-orange-500'>Update</Button>
        </form>


      </Card>
    </>
  )
}

export default UpdateForm
