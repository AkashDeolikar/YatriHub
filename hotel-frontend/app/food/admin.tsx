"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiCompass,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

/* ================= TYPES ================= */
type FoodItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  type: "veg" | "non-veg" | "alcohol";
  isAvailable: boolean;
};

type CartItem = FoodItem & { quantity: number };

/* ================= DATA ================= */
const INITIAL_FOOD_DATA: FoodItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.5,
    type: "veg",
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1598023696416-0193a0bcd302",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    category: "Indian",
    price: 379,
    rating: 4.9,
    type: "non-veg",
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8",
  },
];

/* ================= MAIN ================= */
export default function CulinaryOS() {
  const [view, setView] = useState<"user" | "admin">("user");
  const [foodItems, setFoodItems] = useState(INITIAL_FOOD_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  /* FILTER */
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [foodItems, search]);

  /* CART LOGIC */
  const addToCart = (item: FoodItem) => {
    if (!item.isAvailable) return;

    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ADMIN */
  const toggleAvailability = (id: number) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
  };

  const addNewDish = () => {
    const newDish: FoodItem = {
      id: Date.now(),
      name: "New Dish",
      category: "Custom",
      price: 199,
      rating: 4.2,
      type: "veg",
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    };

    setFoodItems((prev) => [newDish, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <FiCompass className="text-teal-500 text-xl" />
            <div>
              <p className="text-xs text-gray-400">Delivery to</p>
              <p className="text-sm font-medium">Nagpur</p>
            </div>
          </div>

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for dishes..."
            className="bg-white/5 px-4 py-2 rounded-lg text-sm w-1/3 outline-none"
          />

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setView(view === "user" ? "admin" : "user")
              }
              className="text-xs bg-white/10 px-3 py-1 rounded"
            >
              {view === "user" ? "Admin" : "User"}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <FiShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-teal-500 text-black rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ADMIN PANEL */}
      {view === "admin" && (
        <div className="p-4 border-b border-white/10">
          <button
            onClick={addNewDish}
            className="bg-green-500 text-black px-3 py-1 rounded"
          >
            + Add Dish
          </button>
        </div>
      )}

      {/* FOOD GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className="bg-[#111] rounded-xl overflow-hidden border border-white/5"
          >
            <img
              src={item.image}
              className={`h-40 w-full object-cover ${
                !item.isAvailable && "opacity-50"
              }`}
            />

            <div className="p-3">

              {/* TYPE + RATING */}
              <div className="flex justify-between items-center text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.type === "veg"
                        ? "bg-green-500"
                        : item.type === "non-veg"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  {item.type}
                </div>

                <div className="flex items-center gap-1">
                  <FaStar className="text-green-400" size={12} />
                  {item.rating}
                </div>
              </div>

              <h3 className="text-sm font-medium">{item.name}</h3>

              <div className="flex justify-between items-center mt-3">
                <span className="font-semibold">₹{item.price}</span>

                {view === "user" ? (
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.isAvailable}
                    className="bg-teal-500 text-black px-3 py-1 text-xs rounded disabled:opacity-40"
                  >
                    ADD
                  </button>
                ) : (
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`px-3 py-1 text-xs rounded ${
                      item.isAvailable
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.isAvailable ? "Disable" : "Enable"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 w-80 h-full bg-[#0f0f0f] p-4 z-50"
            >
              <h2 className="text-lg mb-4">Your Cart</h2>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between mb-3"
                >
                  {item.name}

                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)}>
                      <FiMinus />
                    </button>

                    {item.quantity}

                    <button onClick={() => updateQty(item.id, 1)}>
                      <FiPlus />
                    </button>
                  </div>
                </div>
              ))}

              <button className="mt-4 bg-teal-500 w-full py-2 text-black rounded">
                Checkout ₹{cartTotal}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}