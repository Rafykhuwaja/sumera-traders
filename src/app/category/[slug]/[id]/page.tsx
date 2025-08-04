import React from 'react'

function ProductDetails({ params }: { params: { slug: string; id: string } }) {
    const { slug, id } = params;
   console.log(slug,id)
  return (
    <div>
      <h1>Product Details</h1>
      <p>Category: {slug}</p>
      <p>Product ID: {id}</p>
      {/* Add more product details here */}
    </div>
  )
}

export default ProductDetails
