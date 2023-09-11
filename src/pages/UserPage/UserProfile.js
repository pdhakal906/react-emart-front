import React from 'react'
import { useGetUserOrderQuery } from '../../features/order/orderApi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Card, Typography } from '@material-tailwind/react';

import { NavLink } from 'react-router-dom';
import { useGetuserProfileQuery } from '../../features/auth/authApi';
import UpdateForm from './UpdateForm';

const UserProfile = () => {
  const { userInfo } = useSelector((store) => store.userInfo);
  const { data, isLoading, isError, error } = useGetUserOrderQuery(userInfo.token);
  const { data: userData, isLoading: load, isError: isE, error: err } = useGetuserProfileQuery(userInfo.token);
  const nav = useNavigate();



  if (isLoading || load) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/94b605ac-df0f-414c-b62b-cc8a9a24073f/SHt6Bk823T.json" background="#fff" speed="1" loop autoplay ></lottie-player>
    </div>
  }


  return (
    <div className='flex justify-around mt-10'>
      <div className='w-[500px]'>
        <UpdateForm user={userData}></UpdateForm>
      </div>
      <div>


        <Card className='shadow-none rounded-none max-w-lg p-5 space-y-10'>
          <Typography variant='h4' color='blue-gray'>
            Your Orders
          </Typography>
          <table className='border-collapse border border-orange-500'>
            <thead>
              <tr>
                <th className='p-4 border border-orange-500'>Date</th>
                <th className='p-4 border border-orange-500'>Total Amount</th>
                <th className='p-4 border border-orange-500'>Action</th>
              </tr>
            </thead>
            <tbody>

              {data.map((order, i) => {
                return (<tr key={i}>
                  <td className='p-4 border  border-orange-500'>{order.createdAt.substr(0, 10)}</td>
                  <td className='p-4 border  border-orange-500'>{order.totalPrice}</td>
                  <td className='p-4 border  border-orange-500 '><div className='flex gap-5 justify-center items-center'><NavLink className='text-blue-400 text-[14px] hover:font-bold'>View</NavLink><i className="fa-solid fa-xmark text-black text-[18px] hover:text-red-500"></i></div></td>
                </tr>)
              })}

            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

export default UserProfile
