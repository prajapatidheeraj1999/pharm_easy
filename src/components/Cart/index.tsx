
import React from 'react';
import ProductCard from '../ProductCard';
import { Product } from './data';

interface CartProps {
  products: Product[];
}

const Cart: React.FC<CartProps> = ({ products }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-wrap -m-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;

