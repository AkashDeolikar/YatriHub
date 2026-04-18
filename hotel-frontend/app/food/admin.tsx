"use client";

import React, { useState, useMemo } from "react";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMinus,
  FiShoppingBag,
  FiCompass,
  FiSearch,
  FiPlus,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

/* ================= MOTION SYSTEM ================= */

const spring = {
  type: "spring",
  stiffness: 220,
  damping: 20,
};

const softSpring = {
  type: "spring",
  stiffness: 160,
  damping: 18,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/* ================= TYPES ================= */

type FoodItem = {
  id: number;
  name: string;
  price: number;
  rating: number;
  type: "veg" | "non-veg" | "alcohol";
  isAvailable: boolean;
  image: string;
};

type CartItem = FoodItem & {
  quantity: number;
};

type Store = {
  foodItems: FoodItem[];
  cart: CartItem[];

  cartCount: number;
  cartTotal: number;

  addToCart: (item: FoodItem) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;

  toggleAvailability: (id: number) => void;
  addDish: () => void;
};

/* ================= STORE ================= */

const useStore = create<Store>((set, get) => ({
  foodItems: [
    {
      id: 1,
      name: "Margherita Pizza",
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
      price: 379,
      rating: 4.9,
      type: "non-veg",
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8",
    },
  ],

  cart: [],

  get cartCount() {
    return get().cart.reduce((sum, i) => sum + i.quantity, 0);
  },

  get cartTotal() {
    return get().cart.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  },

  addToCart: (item) => {
    if (!item.isAvailable) return;

    set((state) => {
      const exist = state.cart.find((i) => i.id === item.id);

      if (exist) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    });
  },

  updateQty: (id, delta) => {
    set((state) => ({
      cart: state.cart
        .map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0),
    }));
  },

  clearCart: () => set({ cart: [] }),

  toggleAvailability: (id) => {
    set((state) => ({
      foodItems: state.foodItems.map((item) =>
        item.id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      ),
    }));
  },

  addDish: () => {
    const newDish: FoodItem = {
      id: Date.now(),
      name: "New Dish",
      price: 199,
      rating: 4.2,
      type: "veg",
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    };

    set((state) => ({
      foodItems: [newDish, ...state.foodItems],
    }));
  },
}));

/* ================= HEADER ================= */

function Header({
  search,
  setSearch,
  openCart,
  cartCount,
}: any) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <FiCompass className="text-teal-400" />
          <span className="text-white font-semibold">
            YatriHub
          </span>
        </div>

        {/* SEARCH */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food..."
              className="w-full bg-white/5 border border-white/10 pl-9 pr-3 py-2 rounded-xl text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* CART */}
        <button
          onClick={openCart}
          className="relative p-2 bg-white/10 rounded-full"
        >
          <FiShoppingBag className="text-white" />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-teal-500 text-black px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

/* ================= FOOD CARD ================= */

function FoodCard({ item }: { item: FoodItem }) {
  const addToCart = useStore((s) => s.addToCart);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-xl"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{item.type}</span>
          <span>⭐ {item.rating}</span>
        </div>

        <h3 className="text-white mt-1">{item.name}</h3>

        <div className="flex justify-between mt-3">
          <span>₹{item.price}</span>

          <button
            onClick={() => addToCart(item)}
            className="px-3 py-1 rounded-full bg-teal-500 text-black text-xs"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= CART ================= */

function CartDrawer({ open, close }: any) {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const total = useStore((s) => s.cartTotal);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={softSpring}
            className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] rounded-t-3xl z-50 p-5 max-h-[80vh]"
          >
            <h2 className="text-lg mb-4">Cart</h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                {item.name}

                <div className="flex gap-2">
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

            <div className="mt-4 font-semibold">
              Total ₹{total}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ================= MAIN ================= */

export default function CulinaryOS() {
  const foodItems = useStore((s) => s.foodItems);
  const cartCount = useStore((s) => s.cartCount);

  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    return foodItems.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [foodItems, search]);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.08),transparent_60%)]" />
      </div>

      <Header
        search={search}
        setSearch={setSearch}
        openCart={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
      >
        {filtered.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </motion.div>

      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
      />
    </div>
  );
}