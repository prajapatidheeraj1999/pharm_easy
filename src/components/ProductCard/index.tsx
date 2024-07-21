// components/ProductCard.tsx
import { RootState } from '@/store';
import { addItem } from '@/store/cartSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
}
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [quantity,setQuantity]=useState<number>(0)

  const cart = useSelector((state: RootState) => state.cart.items)
  
  const dispatch = useDispatch()

 

  const updateProductQuantity = async (productId: number, quantity: number) => {
    try {
      
     const addedData= await axios.post(`https://dummyjson.com/carts/add`, {
        userId:11,
        products: [{ id: productId, quantity }],
      });


    dispatch(addItem(addedData.data.products[0]));
      
      setQuantity((quantity)=>quantity+1)
      
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={product.thumbnail} alt={product.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">
          {product.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${product.price.toFixed(2)}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product.rating} ★
        </span>
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mr-2 mb-2 ${
          product.stock > 0 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
        }`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <div className="flex items-center mb-4 justify-center">
              <button
                className="bg-gray-200 px-2 py-1 rounded-l"
                disabled={quantity<1}
                onClick={() =>updateProductQuantity(product.id, quantity-1)}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{quantity}</span>
              <button
                className="bg-gray-200 px-2 py-1 rounded-r"
                onClick={() => updateProductQuantity(product.id, quantity+1)}
              >
                +
              </button>
            </div>
    </div>
  );
};

export default ProductCard;
