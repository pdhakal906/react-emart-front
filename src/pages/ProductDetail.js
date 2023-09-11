import React from 'react'
import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../features/product/productApi";
import { Image, Shimmer } from 'react-shimmer';
import { baseUrl } from "../features/constant";
import { Card, Rating, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addToCart } from '../features/userInfo';
import { toast } from 'react-toastify';



const ProductDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);
  const { userInfo } = useSelector((store) => store.userInfo);

  const formik = useFormik({
    initialValues: {
      qty: 1
    }
  });

  if (isLoading) {
    return <div className='mx-auto my-auto h-[300px] w-[200px]'>
      <lottie-player src="https://lottie.host/94b605ac-df0f-414c-b62b-cc8a9a24073f/SHt6Bk823T.json" background="white" speed="1" loop autoplay direction="1" mode="normal"></lottie-player>
    </div >
  }




  return (
    <div>
      <div className="grid grid-cols-3 p-7 gap-5">
        <div>
          <Image
            src={`${baseUrl}${product.product_image}`}
            fallback={<Shimmer width={800} height={600} className="w-full h-full" />}
          />
        </div>
        <Card className="h-full w-full shadow-none rounded-none p-5 space-y-5">
          <h1 className="font-bold">{product.product_name}</h1>
          <p className="border-y-2 py-1 border-orange-500">Rs.{product.product_price}</p>
          <p>{product.product_detail}</p>

          {product.numReviews === 0 ? <h1>
            No Reviews yet
          </h1> : <div>

            <div className="flex justify-between">
              <Rating value={product.rating} readonly />
              <h1> Reviews {product.numReviews}</h1>
            </div>

          </div>
          }
        </Card>
        <div>
          {!userInfo?.isAdmin &&
            <Card className="w-full p-5 shadow-none rounded-none">
              <table className=" w-full min-w-max table-auto text-left">
                <tbody>
                  <tr className="text-center">
                    <td className="p-4 border border-orange-500">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Price
                      </Typography>
                    </td>
                    <td className="p-4 border border-orange-500">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {product.product_price}
                      </Typography>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-4 border border-orange-500">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Available
                      </Typography>
                    </td>
                    <td className="p-4 border border-orange-500">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {product.countInStock}
                      </Typography>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-4 border border-orange-500">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Qty
                      </Typography>
                    </td>
                    <td className="p-4 border border-orange-500 ">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        <select onChange={(e) => formik.setFieldValue('qty', e.target.value)} className="p-2 border border-orange-500" name="" id="">
                          {[...Array(product.countInStock).keys()].map((v, i) => {
                            return <option key={i} value={v + 1}>{v + 1}</option>
                          })}
                        </select>
                      </Typography>
                    </td>
                  </tr>
                  <tr className="text-center ">
                    <td colSpan={2}>
                      <button onClick={() => {
                        dispatch(addToCart({
                          name: product.product_name,
                          qty: formik.values.qty,
                          image: product.product_image,
                          price: product.product_price,
                          product: product._id,
                          countInStock: product.countInStock
                        }));

                        nav('/user/cart');

                      }} className=' w-[50%] bg-orange-500 my-5 text-white mx-auto py-1 rounded-sm'>Add To Cart</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>}
        </div>
      </div>
      {/* <Review product={product} /> */}
    </div>
  )
}

export default ProductDetail
