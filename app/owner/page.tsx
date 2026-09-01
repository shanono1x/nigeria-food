"use client";

import { useState } from "react";

export default function OwnerDashboard() {
    const [menu, setMenu] = useState([
        {
            name: "Jollof Rice",
            price: 3500,
            available: true, 
        },
        {
            name: "Grilled Chicken",
            price: 4500,
            available: true,
        }
    ]);

    return (
        <main>
            <h1>Restaurant Owner Dashboard</h1>

            <h2>Frenchies restaurant</h2>

            <p>Manage your restaurant menu</p>

            {menu.map((item) => (
                <div key={item.name}>
                    <h3>{item.name}</h3>
                    <input 
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        const newPrice = Number(e.target.value);

                        setMenu((currentMenu) => 
                          currentMenu.map((food) =>
                            food.name === item.name
                              ? { ...food, price: newPrice }
                              : food
                         )
                        );    
                      }}
                    />
                    <p>
                        {item.available ? "available" : "Unavailable"}
                    </p>
                </div>
            ))}
        </main>
    );
}