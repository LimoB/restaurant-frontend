import pasta from "../assets/pasta.png";
import chickenNuggets from "../assets/chicken-nuggets.png";
import vegetableEggs from "../assets/vegetable-eggs.png";
import burger from "../assets/burger.png";
import sushi from "../assets/sushi.png";
import pizza from "../assets/pizza.png";
import fries from "../assets/fries.png";
import salad from "../assets/salad.png";
import steak from "../assets/steak.png";

// ✅ Export the Product type
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Creamy Pasta",
    price: 8.99,
    image: pasta,
    desc: "Delicious cheesy pasta with herbs.",
  },
  {
    id: "2",
    name: "Chicken Nuggets",
    price: 6.5,
    image: chickenNuggets,
    desc: "Crispy, juicy bites loved by all ages.",
  },
  {
    id: "3",
    name: "Veggie Eggs",
    price: 7.25,
    image: vegetableEggs,
    desc: "Healthy mix of vegetables and eggs.",
  },
  {
    id: "4",
    name: "Classic Burger",
    price: 9.75,
    image: burger,
    desc: "Grilled beef patty with lettuce and cheese.",
  },
  {
    id: "5",
    name: "Salmon Sushi",
    price: 12.0,
    image: sushi,
    desc: "Fresh sushi rolls with premium salmon.",
  },
  {
    id: "6",
    name: "Pepperoni Pizza",
    price: 11.5,
    image: pizza,
    desc: "Thin crust pizza loaded with pepperoni.",
  },
  {
    id: "7",
    name: "French Fries",
    price: 4.5,
    image: fries,
    desc: "Golden and crispy fries with ketchup.",
  },
  {
    id: "8",
    name: "Caesar Salad",
    price: 6.75,
    image: salad,
    desc: "Fresh greens with creamy Caesar dressing.",
  },
  {
    id: "9",
    name: "Grilled Steak",
    price: 14.99,
    image: steak,
    desc: "Juicy grilled steak with a smoky finish.",
  },
];
