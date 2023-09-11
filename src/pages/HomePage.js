import React from 'react'
import '../App.css';
import ProductCard from '../components/ProductCard';
import { useGetAllProductsQuery } from '../features/product/productApi';



const HomePage = () => {

  const { data, isLoading, isError, error } = useGetAllProductsQuery()
  console.log("hello")

  if (isLoading) {

    return (<div className='mx-auto my-auto h-[300px] w-[200px]'>
      <lottie-player src="https://lottie.host/94b605ac-df0f-414c-b62b-cc8a9a24073f/SHt6Bk823T.json" background="white" speed="1" loop autoplay direction="1" mode="normal"></lottie-player>
    </div >)
  }

  return (
    <div>

      <div className='p-9 grid grid-cols-3'>
        {data && data.map((product) => {
          return <ProductCard key={product._id} product={product} />
        })}
      </div>
    </div>
  )
}

export default HomePage
