import React, { useState } from 'react'
import { useGetUserOrderQuery } from '../../features/order/orderApi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip, Typography } from '@material-tailwind/react';

import { useGetuserProfileQuery } from '../../features/auth/authApi';
import UpdateForm from './UpdateForm';
import { TrashIcon } from '@heroicons/react/24/outline';

const UserProfile = () => {
  const { userInfo } = useSelector((store) => store.userInfo);
  const { data, isLoading, isError, error } = useGetUserOrderQuery(userInfo.token);
  const { data: userData, isLoading: load, isError: isE, error: err } = useGetuserProfileQuery(userInfo.token);
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);



  if (isLoading || load) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/94b605ac-df0f-414c-b62b-cc8a9a24073f/SHt6Bk823T.json" background="#F4F4F4" speed="1" loop autoplay ></lottie-player>
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
                  <td className='p-4 border text-center  border-orange-500'>{order.totalPrice}</td>
                  <td className='p-4 border border-orange-500 '><div className='flex gap-5 justify-center items-center'><Tooltip className='bg-orange-500 text-white' content="View Order"><Button onClick={() => nav(`/user/orderDetail/${order._id}`)} className='text-blue-400 text-[14px] bg-transparent shadow-none hover:shadow-none'><i class="fa-solid fa-book-open"></i></Button></Tooltip><Tooltip className='bg-orange-500 text-white' content="Cancel Order">
                    <IconButton onClick={handleOpen} variant="text" color="red">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>

                    <Dialog open={open}>
                      <DialogHeader>Are You Sure You Want To Cancel This Order?.</DialogHeader>
                      <DialogBody divider>
                        When you cancel order it will be removed from your orders.
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="text"
                          color="red"
                          onClick={handleOpen}
                          className="mr-1"
                        >
                          <span>No</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={() => {
                          console.log('xxx')
                          // handleDelete({
                          //   id: _id,
                          //   token: userInfo.token,
                          //   imagePath: product_image
                          // });
                          handleOpen();

                        }}>
                          Yes
                        </Button>
                      </DialogFooter>
                    </Dialog>

                  </div>
                  </td>
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
