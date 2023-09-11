import { Button, Card } from '@material-tailwind/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useAddOrderMutation } from '../../features/order/orderApi';
import { toast } from 'react-toastify';
import { clearCart } from '../../features/userInfo';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { userInfo, carts } = useSelector((store) => store.userInfo);
  const [addOrder, { isLoading, isError, error }] = useAddOrderMutation();



  const totals = carts.reduce((a, b) => {
    return a + b.qty * b.price
  }, 0);


  const orderAdd = async (total, orderItems) => {
    try {
      await addOrder({
        body: {
          totalPrice: total,
          orderItems: orderItems

        },
        token: userInfo.token
      }).unwrap();
      toast.success('Order added successfully.')
      dispatch(clearCart());
      nav('/');
    } catch (err) {
      toast.error(err.data.message)
    }
  }





  return (
    <Card className='rounded-none max-w-md mt-10 ml-10 p-5'>

      <p className='p-5'>Your total is: Rs.{totals}</p>
      <Button onClick={() => orderAdd(totals, carts)} className='bg-orange-500 max-w-xs'>Checkout</Button>
    </Card>
  )
}

export default CheckoutPage
