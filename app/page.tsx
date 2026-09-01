"use client"

import { restaurants } from "./data/restaurants";
import { useState } from "react";

type Food = {
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function Home() {
  const [search, setSearch] = useState("")
  const [checkout, setCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cart, setCart] = useState<
    {name: string; price: number; quantity: number }[]
  >([]);
const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const foods: Food[] = [
    {
      name: "Jollof Rice",
      price: 3500,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      description: "Delicious Nigerian-style jollof rice.",
    },
    {
      name: "chicken",
      price: 4000,
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      description: "Juicy and well-seasonedchicken.",
    },
    {
      name: "Fried Rice",
      price: 3500,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      description: "Delicious Nigerian-style fried rice.",
    }
  ];

  const restaurantMenus = {
    "Frenchies Restaurant": [
      {
        name: "Jollof Rice",
        price: 3500,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
        description: "Delicious Nigerian-style jollof rice."
      },
      {
        name: "Grilled Chicken",
        price: 4500,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435",
        description: "Juicy and well-seasoned grilled chicken."
      },
    ],

    "Arewa Kitchen": [
      {
        name: "tuwo Shinkafa",
        price: 3000,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        description: "Traditional northern Nigerian tuwo."
      },
      {
        name: "Miyan Kuka",
        price: 3500,
        image: "https://images.unsplash.com/photo-1547592180-85f1f3990554",
        description: "Traditional northern Nigerian soup."
      },
    ],

    "Taste of Nigeria": [
      {
        name: "Fried Rice",
        price: 3500,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        description: "Flavourful Nigerian-style fried rice."
      },
      {
        name: "Pepper Chicken",
        price: 4000,
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6",
        description: "Tender chicken cooked with a rich pepper sauce."
      },   
    ],
  };

  const currentMenu = selectedRestaurant
    ? restaurants.find(
        (restaurant) => restaurant.name === selectedRestaurant
      )?.menu || []
    : foods;
    
  const filteredFoods = currentMenu.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
);

function addToCart(food: { name: string; price: number }) {
  const existingItem = cart.find(
    (item) => item.name === food.name
  );

  if (existingItem) {
    setCart(
      cart.map((item) => 
        item.name === food.name
          ? { ...item, quantity: item.quantity + 1}
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        name: food.name,
        price: food.price,
        quantity: 1,
      },
    ]);
  }
}

function removeFromCart(name: string) {
  setCart(
    cart
      .map((item) => 
        item.name === name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

       <section id="restaurants">
        <h2>Choose a Restaurant</h2>

        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
          <div 
            className="restaurant-card"
            key={restaurant.id}
            onClick={() => setSelectedRestaurant(restaurant.name)}
          >
            <h3>{restaurant.name}</h3>
            <p>{restaurant.location}</p>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRestaurant(restaurant.name);
              }}
            >
              View Menu
            </button>
          </div>
          ))}
        </div>
      </section>

      <div className="shop-layout">

      <section id="foods">
        <h2>
          {selectedRestaurant
            ? `${selectedRestaurant} - Menu`
            : "Popular Nigerian Foods"}
        </h2>

        {selectedRestaurant && (
          <p className="selected-restaurant">
            You are ordering from {selectedRestaurant} 
          </p>
        )}

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <div className="food-card" key={food.name}>
              <img src={food.image} alt={food.name} />

              <h3>{food.name}</h3>

              <p>{food.description}</p>

              <p>&#8358;{food.price.toLocaleString()}</p>

              <button
                className="add-to-cart"
                onClick={() => addToCart(food)}
              >
                Add to Cart
              </button>
            </div>
          ))}         
        </div>
      </section>
      </div>

      <section id="cart">
        <h2>Cart</h2>

        <p>Items in cart: {cart.length}</p>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.name}>
                <p>
                  {item.name} - &#8358;
                  {item.price.toLocaleString()} * {item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.name)}
                >
                  -
                </button>

                <button
                  onClick={() => {
                    setCart(
                      cart.map((cartItem) =>
                        cartItem.name === item.name
                          ?{
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                          }
                        :cartItem
                    )
                  );
                }}
                >
                  +
                </button>
              </div>
            ))}
            
            <h3>
              Total: &#8358;{total.toLocaleString()}
            </h3>

            <button 
              className="checkout-button"
              onClick={() => setCheckout(true)}
            >
              Checkout 
            </button>
          </div>
        )}
      </section>
      

      {checkout && (
        <section>
          <h2>Checkout</h2>
          <p>Review your order before placing it.</p>

          <input 
            type="text"
            placeholder="Your name"
          />
          <input
            type="tel"
            placeholder="Phone number"
          />
          <textarea
            placeholder="Delivery address"
            rows={4}
          />
          <input 
            type="email"
            placeholder="Email address"
          />

          <h3>Order Summary</h3>

           {cart.map((item) => (
            <p key={item.name}>
              {item.name} x {item.quantity} - &#8358;
              {(item.price * item.quantity).toLocaleString()}
            </p>
          ))}

          <h3>
            Total: &#8358;{total.toLocaleString()}
          </h3>

          <p>Ready to place your order?</p>

          <button
            onClick={() => setOrderPlaced(true)}
          >
            Place Order
          </button>

          {orderPlaced && (
            <p>Order placed successfully! 🎉</p>
          )}

        </section>
      )}
    </main>
  );
}