import { Card, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../features/constant";

import { addToCart, removeFromCart } from "../features/userInfo";
import { useNavigate } from "react-router";

const CartPage = () => {



  const { userInfo, carts } = useSelector((store) => store.userInfo);
  const nav = useNavigate();


  const total = carts.reduce((a, b) => {
    return a + b.qty * b.price
  }, 0);

  //  same as: 
  //     for (let i = 0; i < carts.length; i++) {
  //    const item = carts[i];
  //    total += item.qty * item.price;
  // }



  const dispatch = useDispatch();


  return (
    <div className="p-4">
      <h1 className="text-2xl mb-7 font-bold">Your Carts Items</h1>


      <div className="grid grid-cols-3 gap-5 items-start ">



        <div className="col-span-2">


          {carts.map((cart, i) => {
            return <div key={i} className="grid grid-cols-3 gap-5  mb-5 max-w-xl bg-white p-5">
              <img className="w-[75px] h-[75px]" src={`${baseUrl}${cart.image}`} alt="" />

              <div className="info flex flex-col justify-between">
                <h1>{cart.name}</h1>
                <p>Rs.{cart.price}</p>

                <Typography variant="small" color="blue-gray" className="font-normal">
                  <select
                    value={cart.qty}
                    onChange={(e) => {
                      dispatch(
                        addToCart({

                          name: cart.name,
                          qty: e.target.value,
                          image: cart.image,
                          price: cart.price,
                          product: cart.product,
                          countInStock: cart.countInStock
                        })

                      );
                    }


                    } className="p-2 border border-orange-500" name="" id="">

                    {[...Array(cart.countInStock).keys()].map((v, i) => {
                      return <option key={i} value={v + 1}>{v + 1}</option>
                    })}
                  </select>
                </Typography>

                {/* <p>{cart.qty}</p> */}

              </div>
              <div className="totals flex flex-col justify-between items-end">

                <button onClick={() => dispatch(removeFromCart(i))}><i className="fa-solid fa-xmark"></i></button>
                <p>Total: {cart.qty * cart.price}</p>
              </div>
            </div>
          })}





        </div>




        <Card className="w-full p-5 rounded-none shadow-none">
          <table className="w-full min-w-max table-auto text-left">

            <tbody>


              <tr className="text-center">
                <td className="p-4 border border-orange-500">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Total Items
                  </Typography>
                </td>
                <td className="p-4 border border-orange-500">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {carts.length}
                  </Typography>
                </td>



              </tr>

              <tr className="text-center">
                <td className="p-4 border border-orange-500">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Total Price
                  </Typography>
                </td>
                <td className="p-4 border border-orange-500">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Rs.{total}
                  </Typography>
                </td>



              </tr>
              <tr className="text-center">
                <td className="p-4 border border-orange-500">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Status
                  </Typography>
                </td>
                <td className="p-4 border border-orange-500">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Cash On Delivery
                  </Typography>
                </td>



              </tr>



              <tr className="text-center ">
                <td colSpan={2}>
                  <button onClick={() => {
                    if (userInfo.shippingAddress.isEmpty) {
                      nav('/user/shipping');
                    } else {
                      nav('/user/checkout');
                    }
                  }} className=' w-[60%] bg-orange-500 my-5 text-white mx-auto py-1 rounded-sm '>Proceed To CheckOut</button>

                </td>
              </tr>
            </tbody>






          </table>
        </Card>





      </div>




    </div>
  )
}
export default CartPage