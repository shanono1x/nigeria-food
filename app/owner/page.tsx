"use client";

import { useState, useEffect } from "react";
import "./owner.css";
import { restaurants } from "../data/restaurants";

export default function OwnerDashboard() {
    const [menu, setMenu] = useState(
        restaurants[0].menu
    );

    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const savedMenu = localStorage.getItem("frenchiesMenu");

        if (savedMenu) {
            setMenu(JSON.parse(savedMenu));
        }

        const savedOrders = localStorage.getItem("orders");

        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    const [newFoodName, setNewFoodName] = useState("");
    const [newFoodPrice, setNewFoodPrice] = useState("");
    const [newFoodDescription, setNewFoodDescription] = useState("");
    const [newFoodImage, setNewFoodImage] = useState("");
    const [editingFoodId, setEditingFoodId] = useState("");

    const startEditing = (food: any) => {
        setEditingFoodId(food.id);
        setNewFoodName(food.name);
        setNewFoodPrice(String(food.price));
        setNewFoodDescription(food.description);
        setNewFoodImage(food.image || "");
    };

    return (
        <main className="owner-dashboard">
            <h1>Restaurant Owner Dashboard</h1>

            <h2>Frenchies restaurant</h2>

            <p>Manage your restaurant menu</p>

            <button 
                onClick={() => {
                    if (editingFoodId) {
                        setMenu((currentMenu) => 
                            currentMenu.map((food) =>
                                food.id === editingFoodId
                                    ? {
                                          ...food,
                                          name: newFoodName,
                                          price: Number(newFoodPrice),
                                          description: newFoodDescription,
                                          image: newFoodImage || food.image,
                                      }
                                    : food
                            )
                        );

                        localStorage.setItem(
                            "frenchiesMenu",
                            JSON.stringify(
                                menu.map((food) => 
                                    food.id === editingFoodId
                                        ? {
                                              ...food,
                                              name: newFoodName,
                                              price: Number(newFoodPrice),
                                              description: newFoodDescription,
                                              image: newFoodImage || food.image,
                                          }
                                        : food
                                )
                            )
                        );

                        setEditingFoodId("");
                        setNewFoodName("");
                        setNewFoodPrice("");
                        setNewFoodDescription("");
                        setNewFoodImage("");

                        alert("Food updated!");
                    } else {
                        localStorage.setItem(
                            "frenchiesMenu",
                            JSON.stringify(menu)
                        );
                        alert("Changes saved!");
                    }
                }}
            >
                Save Changes
            </button>

            <div>
                <h2>Add New Food</h2>

                <input 
                    type="text"
                    placeholder="Food name"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Price"
                    value={newFoodPrice}
                    onChange={(e) => setNewFoodPrice(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={newFoodDescription}
                    onChange={(e) => setNewFoodDescription(e.target.value)}
                />

                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            const reader = new FileReader();

                            reader.onloadend = () => {
                                setNewFoodImage(reader.result as string);
                            };

                            reader.readAsDataURL(file);
                        }
                    }}
                />
            </div>

            <button
                onClick={() => {
                    if (!newFoodName || !newFoodPrice) {
                        alert("Please enter food name and price");
                        return;
                    }

                    const newFood = {
                        id: Date.now().toString(),
                        name: newFoodName,
                        price: Number(newFoodPrice),
                        description: newFoodDescription,
                        image: newFoodImage,
                        available: true,
                    };

                    setMenu((currentMenu) => [...currentMenu, newFood]);

                    setNewFoodName("");
                    setNewFoodPrice("");
                    setNewFoodDescription("");
                    setNewFoodImage("");
                }}
            >
                Add Food
            </button>

            {menu.map((item) => (
                <div key={item.id}>
                    {item.image && (
                        <img 
                            src={item.image}
                            alt={item.name}
                            width={200}
                        />
                    )}
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <input 
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        const newPrice = Number(e.target.value);

                        setMenu((currentMenu) => 
                          currentMenu.map((food) =>
                            food.name === item.id
                              ? { ...food, price: newPrice }
                              : food
                         )
                        );    
                      }}
                    />
                    <p>
                        {item.available ? "available" : "Unavailable"}
                    </p>

                    <button
                        onClick={() => {
                            const updatedMenu = menu.map((food) => 
                                food.id === item.id
                                    ? { ...food, available: !food.available}
                                    :food
                            );

                            setMenu(updatedMenu);

                            localStorage.setItem(
                                "frenchiesMenu",
                                JSON.stringify(updatedMenu)
                            );
                        }}
                    >
                        {item.available ? "Mark Unavailable" : "Mark Available"}
                    </button>

                    <button
                    onClick={() => startEditing(item)}
                    >
                        Edit Food
                    </button>

                    <button
                       onClick={() => {
                        const updatedMenu = menu.filter(
                            (food) => food.id !== item.id
                        );

                        setMenu(updatedMenu);

                        localStorage.setItem(
                            "frenchiesMenu",
                            JSON.stringify(updatedMenu)
                        );
                       }}
                    >
                        Delete Food 
                    </button>
                </div>
            ))}

            <section>
                <h2>Orders</h2>

                <button
                    onClick={() => {
                        localStorage.removeItem("orders");
                        setOrders([]);
                    }}
                >
                    Clear Test Orders 
                </button>

                {orders.length === 0 ? (
                    <p>No orders yet.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index}>
                            <h3>Order #{index + 1}</h3>
                            <p>Customer Name: {order.name}</p>
                            <p>Phone Number: {order.phone}</p>
                            <p>Delivery Address: {order.address}</p>
                            <p>Email Address: {order.email}</p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}