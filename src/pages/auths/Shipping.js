import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useUserUpdateMutation } from '../../features/auth/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { userUpdate } from '../../features/userInfo'
import { toast } from 'react-toastify'

const Shipping = () => {
  const [updateUser, { isLoading, isError, error, isSuccess }] = useUserUpdateMutation();
  const { userInfo } = useSelector((store) => store.userInfo);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const addressSchema = Yup.object().shape({
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required')
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      city: ''
    },
    onSubmit: async (val) => {
      try {
        await updateUser({
          body: {
            address: val.address,
            city: val.city,
            isEmpty: false
          },
          token: userInfo.token
        }).unwrap();
        dispatch(userUpdate({
          shippingAddress: {
            address: val.address,
            city: val.city,
            isEmpty: false
          }
        }));


        toast.success('Successfully updated');
        nav(-1);
      } catch (err) {
        toast.error(err.data.message);
      }
    },
    validationSchema: addressSchema
  });




  return (
    <Card color="transparent" shadow={false} className='mx-auto max-w-xl mt-24 space-y-9'  >
      <Typography variant="h4" color="blue-gray">
        Enter Your Address To Continue
      </Typography>

      <form onSubmit={formik.handleSubmit} >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            name='address'
            type='text'
            size="lg" label="Address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />

          {formik.errors.address && formik.touched.address && <h1 className='text-pink-700'>{formik.errors.address}</h1>}

          <Input
            name='city'
            type="text"
            size="lg"
            label="City"

            onChange={formik.handleChange}
            value={formik.values.city}
          />
          {formik.errors.city && formik.touched.city && <h1 className='text-pink-700'>{formik.errors.city}</h1>}

        </div>

        {isLoading ? <Button type='submit' className="mt-6" fullWidth>
          <div className='h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto '></div>
        </Button> : <Button type='submit' className="mt-6 bg-orange-500" fullWidth>
          Submit
        </Button>
        }




      </form>
    </Card>
  )
}

export default Shipping
