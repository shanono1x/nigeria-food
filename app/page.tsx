"use client";

import { useState } from "react";

export default function Home() {
  const [cart, setCart ] = useState<
     { name: string; price: number; quantity: number }[]
  >([]);

  return (
  <main>
   <header>
      <h1>Nigeria Food</h1>

      <nav>
        <a href="/">Home</a>
        <a href="#foods">Foods</a>
        <a href="#cart">Cart</a>
      </nav>
    </header>

    <section>
      <h2>Delicious Nigerian Food, Delivered</h2>
      <p>Discover your favourite Nigerian meals.</p>

      <input
        type="text"
        placeholder="Search for food..."
      />
    </section>
      <section>
      <h1>Nigeria Food</h1>
      <p>Discover delicious Nigerian food.</p>
      
      <h2> Popular Nigerian Foods</h2>
      <div className="food-grid">
        <div>
          <h3>Jollof Rice</h3>
          <p>Delicious Nigerian-style jollof rice.</p>
          <p>&#8358;3,500</p>
          <button
            onClick={() => {
              const item = cart.find((item) => item.name === "Jollof Rice");

              if (item) {
                setCart(
                  cart.map((item) =>
                  item.name === "Jollof Rice"
                    ? { ...item, quantity: item.quantity + 1 }
                    : item 
                )
              );
            } else {
              setCart([
                ...cart,
                { name: "Jollof Rice", price: 3500, quantity: 1 },
              ]);
            }
          }}
        >
          Add to Cart
        </button>
        </div> 

        <div> 
          <h3>Chicken</h3>
          <p>Juicy and well-seasoned chicken.</p>
          <p>&#8358;4,000</p>
          <button 
          onClick={() => {
            const existingItem = cart.find(
              (item) => item.name === "Chicken"
            );

            if (existingItem) {
              setCart(
                cart.map((item) =>
                  item.name === "Chicken"
                    ? {...item, quantity: item.quantity + 1}
                    : item
                )
              );
            } else {
              setCart([
                ...cart,
                {
                  name: "Chicken",
                  price: 4000,
                  quantity: 1,
                },
              ]);
            }
          }}
        >
          Add to cart
        </button>
        </div>

        <div>
          <h3>Fried Rice</h3>
          <p>Delicious Nigerian-style fried rice.</p>
          <p>&#8358;3,500</p>

          <button
            onClick={() => {
              const existingItem = cart.find(
                (item) => item.name === "Fried Rice"
              );

              if (existingItem) {
                setCart(
                  cart.map((item) =>
                  item.name === "Fried Rice"
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                  )
                );
              } else {
                setCart([
                  ...cart,
                  {
                    name: "Fried Rice",
                    price: 3500,
                    quantity: 1,
                  },
                ]);
              }
            }}
          >
            Add to Cart
          </button>
        </div>
        
      </div>
      </section>
      <h2>Cart</h2>
      <p>Items in cart: {cart.length}</p>

      {cart.map((item, index) => (
        <p key={index}>
          {item.name} - {"\u20A6"}
          {item.price.toLocaleString()} - quantity: {item.quantity}
          <button
            onClick={() => { 
              setCart(
                cart
                .map((cartItem) => {
                  if (cartItem.name === item.name) {
                    return {
                      ...cartItem,
                      quantity: cartItem.quantity - 1,
                    };
                  }

                  return cartItem;
                })
                .filter((cartItem) => cartItem.quantity > 0)
              );
            }}
          >
            -
          </button>

          <button
            onClick={() => {
              setCart(
                cart.map((cartItem) => 
                cartItem.name === item.name
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem  
                  )
              );
            }}
            >
              +
          </button>
        </p>
       ))}

       <p>
        Total: {"\u20A6"}
        {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
      </p>
    </main>
 );
}