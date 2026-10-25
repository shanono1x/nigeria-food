"use client"

import { restaurants } from "./data/restaurants";
import { useState, useEffect } from "react";

type Food = {
  name: string;
  price: number;
  image?: string;
  description: string;
  available?: boolean;
};

export default function Home() {
  const [search, setSearch] = useState("")
  const [checkout, setCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  
  const [cart, setCart] = useState<
    { name: string; price: number; quantity: number }[]
  >([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [savedFrenchiesMenu, setSavedFrenchiesMenu] = useState<Food[] | null>(null);

  useEffect(() => {
    const savedMenu = localStorage.getItem("frenchiesMenu");

    if (savedMenu) {
      setSavedFrenchiesMenu(JSON.parse(savedMenu));
    }
  }, []);

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

  const restaurantMenus: Record<string, Food[]> = {
    "Frenchies Restaurant": [
      {
        name: "Jollof Rice",
        price: 3500,
        description: "Delicious Nigerian-style jollof rice.",
        available: true,
      },
      {
        name: "Grilled Chicken",
        price: 4500,
        description: "Juicy and well-seasoned grilled chicken.",
        available: true,
      },
    ],

    "Arewa Kitchen": [
      {
        name: "Tuwo Shinkafa",
        price: 2500,
        description: "Soft rice-based swallow served with rich northern soup.",
      },
      {
        name: "Miyan Kuka",
        price: 2500,
        description: "Traditional northern baobab leaf soup with a rich, smooth texture.",
      }
    ],

    "Taste of Nigeria": [
      {
        name: "Fried Rice",
        price: 3500,
        description: "Flavourful Nigerian-style fried rice."
      },
      {
        name: "Pepper Chicken",
        price: 4000,
        description: "Tender chicken cooked with a rich pepper sauce."
      },
    ],
  };

  const currentMenu: Food[] = selectedRestaurant
    ? selectedRestaurant === "Frenchies Restaurant" && savedFrenchiesMenu
      ? savedFrenchiesMenu
      : restaurantMenus[selectedRestaurant] || []
    : foods;

  const filteredFoods = currentMenu.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  function addToCart(food: Food) {
    const existingItem = cart.find(
      (item) => item.name === food.name
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === food.name
            ? { ...item, quantity: item.quantity + 1 }
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
          <h2 className="foods-title">
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
                {food.image ? (
                  <img src={food.image} alt={food.name} />
                ) : null}

                <h3>{food.name}</h3>

                <p>{food.description}</p>

                <p>&#8358;{food.price.toLocaleString()}</p>

                {(food.available as boolean) === false ? (
                  <p>Unavailable</p>
                ) : (
                <button
                  onClick={() => addToCart(food)}
                >
                  {(food.available as boolean) === false ? "Unavailable" : "Add to Cart"}
                </button>
              )}
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
                          ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                          }
                          : cartItem
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
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
          <textarea
            placeholder="Delivery address"
            rows={4}
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
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
            onClick={() => {
              const newOrder = {
                name: customerName,
                phone: customerPhone,
                address: customerAddress,
                email: customerEmail,
                items: cart,
                total: total,
              };

              const savedOrders = localStorage.getItem("orders");

              const existingOrders = savedOrders
                ? JSON.parse(savedOrders)
                : [];

              const updatedOrders = [...existingOrders, newOrder];

              localStorage.setItem(
                "orders",
                JSON.stringify(updatedOrders)
              );

              setOrderPlaced(true);
            }}
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