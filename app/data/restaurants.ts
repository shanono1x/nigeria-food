export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  available: boolean;
};

export type Restaurant = {
    id: string;
    name: string;
    location: string;
    menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
    {
        id: "frenchies",
        name: "Frenchies Restaurant",
        location: "Kano",
        menu: [
            {
                id: "frenchies-jollof",
                name: "Jollof Rice",
                price: 3500,
                image: "",
                description: "Delicious Nigerian-style jollof rice.",
                available: true,
            },
            {
                id: "frenchies-chicken",
                name: "Grilled Chicken",
                price: 4500,
                image: "",
                description: "Juicy and well-seasoned grilled chicken.",
                available: true,
            },
        ],
    },

    {
        id: "arewa",
        name: "Arewa Kitchen",
        location: "Kano",
        menu: [
            {
                id: "arewa-tuwo",
                name: "Tuwo Shinkafa",
                price: 3000,
                image: "",
                description: "Traditional northern Nigerian tuwo.",
                available: true,
            },
            {
                id: "arewa-kuka",
                name: "Miyan Kuka",
                price: 3500,
                image: "",
                description: "traditional northern Nigerian soup.",
                available: true,
            },
        ],
    },

    {
        id: "taste-of-nigeria",
        name: "Taste of Nigeria",
        location: "Abuja",
        menu: [
            {
                id: "taste-fried-rice",
                name: "Fried Rice",
                price: 3500,
                image: "",
                description: "Flavourful Nigerian-style fried rice.",
                available: true,
            },
            {
                id: "taste-pepper-chicken",
                name: "Pepper Chicken",
                price: 4000,
                image: "",
                description: "Tender chicken cooked with a rich pepper sauce.",
                available: true,
            },
        ],
    },
];