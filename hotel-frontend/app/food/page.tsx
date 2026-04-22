"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

import {
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiX,
  FiCompass,
  FiSearch,
  FiPackage,
  FiToggleLeft,
  FiToggleRight,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

/* ─────────────────────────── TYPES ─────────────────────────── */

type DishType = "veg" | "non-veg" | "alcohol";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  type: DishType;
  time: string;
  isAvailable: boolean;
}

interface CartItem extends FoodItem {
  quantity: number;
}

type View = "user" | "admin";

/* ─────────────────────────── CONSTANTS ─────────────────────── */

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

const CATEGORIES = ["All", "Pizza", "Indian", "Burger", "Chinese", "Drinks", "Liquor", "Starters", "Soups", "Desserts", "Continental", "Healthy", "Sides"] as const;

const INITIAL_FOOD_DATA: FoodItem[] = [
  { id: 1,  name: "Margherita Pizza",    category: "Pizza",       price: 299, rating: 4.5, type: "veg",     time: "25 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=800&auto=format&fit=crop" },
  { id: 2,  name: "Farmhouse Pizza",     category: "Pizza",       price: 399, rating: 4.7, type: "veg",     time: "30 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=800&auto=format&fit=crop" },
  { id: 3,  name: "Pepperoni Pizza",     category: "Pizza",       price: 449, rating: 4.6, type: "non-veg", time: "28 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop" },
  { id: 4,  name: "Butter Chicken",      category: "Indian",      price: 349, rating: 4.8, type: "non-veg", time: "30 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop" },
  { id: 5,  name: "Paneer Butter Masala",category: "Indian",      price: 299, rating: 4.6, type: "veg",     time: "25 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop" },
  { id: 6,  name: "Chicken Biryani",     category: "Indian",      price: 379, rating: 4.9, type: "non-veg", time: "35 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=800&auto=format&fit=crop" },
  { id: 7,  name: "Cheese Burger",       category: "Burger",      price: 199, rating: 4.3, type: "veg",     time: "20 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" },
  { id: 8,  name: "Chicken Burger",      category: "Burger",      price: 249, rating: 4.5, type: "non-veg", time: "22 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
  { id: 9,  name: "Hakka Noodles",       category: "Chinese",     price: 229, rating: 4.4, type: "veg",     time: "20 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Chilli Chicken",      category: "Chinese",     price: 329, rating: 4.7, type: "non-veg", time: "30 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "Cold Coffee",         category: "Drinks",      price: 149, rating: 4.5, type: "veg",     time: "10 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" },
  { id: 13, name: "Red Wine",            category: "Liquor",      price: 499, rating: 4.8, type: "alcohol", time: "5 mins",  isAvailable: true,  image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop" },
  { id: 14, name: "Whiskey",             category: "Liquor",      price: 599, rating: 4.9, type: "alcohol", time: "5 mins",  isAvailable: true,  image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop" },
  { id: 15, name: "Beer",                category: "Liquor",      price: 299, rating: 4.6, type: "alcohol", time: "3 mins",  isAvailable: true,  image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800&auto=format&fit=crop" },
  { id: 16, name: "Spring Rolls",        category: "Starters",    price: 199, rating: 4.5, type: "veg",     time: "15 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
  { id: 18, name: "Tomato Soup",         category: "Soups",       price: 149, rating: 4.3, type: "veg",     time: "12 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" },
  { id: 22, name: "Chocolate Brownie",   category: "Desserts",    price: 149, rating: 4.8, type: "veg",     time: "8 mins",  isAvailable: true,  image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop" },
  { id: 23, name: "Gulab Jamun",         category: "Desserts",    price: 129, rating: 4.7, type: "veg",     time: "10 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=800&auto=format&fit=crop" },
  { id: 25, name: "Veg Pasta",           category: "Continental", price: 299, rating: 4.5, type: "veg",     time: "20 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop" },
  { id: 29, name: "Quinoa Bowl",         category: "Healthy",     price: 329, rating: 4.6, type: "veg",     time: "15 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { id: 30, name: "Truffle Fries",       category: "Sides",       price: 179, rating: 4.4, type: "veg",     time: "10 mins", isAvailable: true,  image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop" },
];

/* ─────────────────────────── HELPERS ───────────────────────── */

/** Returns total quantity across all cart items */
function getCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/** Returns subtotal */
function getCartSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const TYPE_DOT: Record<DishType, string> = {
  veg:     "bg-green-500",
  "non-veg": "bg-red-500",
  alcohol: "bg-amber-400",
};

/* ─────────────────────────── MOTION VARIANTS ───────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05 } },
};

/* ═══════════════════════════════════════════════════════════════
   FOOD CARD
═══════════════════════════════════════════════════════════════ */

interface FoodCardProps {
  item: FoodItem;
  cartQty: number;
  onAdd: (item: FoodItem) => void;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
}

function FoodCard({ item, cartQty, onAdd, onInc, onDec }: FoodCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
        item.isAvailable
          ? "bg-white/[0.03] border-white/10 hover:border-white/20"
          : "bg-white/[0.015] border-white/5 opacity-50 grayscale"
      }`}
    >
      {/* ── Image ── */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Sold-out badge */}
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Category pill */}
        <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
          {item.category}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Type indicator + rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${TYPE_DOT[item.type]}`} />
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">{item.type}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            <FaStar size={10} />
            <span className="font-medium">{item.rating}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">{item.name}</h3>

        {/* Price + time + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-white font-bold">₹{item.price}</p>
            <p className="text-gray-500 text-[10px] flex items-center gap-1 mt-0.5">
              <FiClock size={10} /> {item.time}
            </p>
          </div>

          {/* Cart controls */}
          {cartQty > 0 ? (
            <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-1 py-0.5">
              <button
                onClick={() => onDec(item.id)}
                aria-label={`Remove one ${item.name}`}
                className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-teal-500/20 transition"
              >
                <FiMinus size={12} className="text-teal-400" />
              </button>
              <span className="text-teal-300 text-xs font-bold w-4 text-center">{cartQty}</span>
              <button
                onClick={() => onInc(item.id)}
                aria-label={`Add another ${item.name}`}
                className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-teal-500/20 transition"
              >
                <FiPlus size={12} className="text-teal-400" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(item)}
              disabled={!item.isAvailable}
              aria-label={`Add ${item.name} to cart`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-500 text-black text-xs font-bold hover:bg-teal-400 active:scale-95 disabled:opacity-0 transition-all duration-150"
            >
              <FiPlus size={12} /> Add
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CART DRAWER
═══════════════════════════════════════════════════════════════ */

interface CartDrawerProps {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onCheckout: () => void;
}

function CartDrawer({ open, cart, onClose, onInc, onDec, onCheckout }: CartDrawerProps) {
  const subtotal = getCartSubtotal(cart);
  const taxes    = Math.round(subtotal * TAX_RATE);
  const total    = subtotal + DELIVERY_FEE + taxes;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[60] h-full w-full max-w-md bg-[#0b0b0b] border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <div>
                <h2 className="text-white font-semibold text-base">Your Cart</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {getCartCount(cart)} {getCartCount(cart) === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white active:scale-95 transition"
              >
                <FiX size={18} />
              </button>
            </header>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6 gap-3">
                  <FiShoppingBag className="text-gray-600" size={36} />
                  <p className="text-gray-300 text-sm font-medium">Your cart is empty</p>
                  <p className="text-gray-600 text-xs">Add some delicious items to get started</p>
                  <button
                    onClick={onClose}
                    className="mt-2 text-teal-400 text-sm hover:text-teal-300 transition"
                  >
                    Browse menu →
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 px-5 py-4 hover:bg-white/[0.025] transition">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-14 w-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">₹{item.price} each</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onDec(item.id)}
                            aria-label="Decrease quantity"
                            className="h-7 w-7 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white active:scale-95 transition"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="text-white text-sm font-semibold w-5 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onInc(item.id)}
                            aria-label="Increase quantity"
                            className="h-7 w-7 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white active:scale-95 transition"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-white text-sm font-semibold tabular-nums shrink-0">
                        ₹{item.price * item.quantity}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <footer className="shrink-0 border-t border-white/10 px-5 py-5 bg-[#0b0b0b] space-y-4">
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Subtotal",       value: `₹${subtotal}` },
                    { label: "Delivery",        value: `₹${DELIVERY_FEE}` },
                    { label: `GST (${Math.round(TAX_RATE * 100)}%)`, value: `₹${taxes}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-gray-400">
                      <span>{label}</span>
                      <span className="tabular-nums">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="tabular-nums">₹{total}</span>
                  </div>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 rounded-xl bg-teal-500 text-black text-sm font-bold hover:bg-teal-400 active:scale-[0.98] transition-all"
                >
                  Confirm Order · ₹{total}
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ORDER SUCCESS OVERLAY
═══════════════════════════════════════════════════════════════ */

interface OrderSuccessProps {
  open: boolean;
  onClose: () => void;
}

function OrderSuccessOverlay({ open, onClose }: OrderSuccessProps) {
  // Auto-dismiss after 6 s
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="success-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,184,166,0.12),transparent_60%)]" />

          {/* Modal */}
          <motion.div
            key="success-modal"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{  opacity: 0, y: 30,  scale: 0.95 }}
            transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-[28px] bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.4)] p-7 text-center overflow-hidden"
          >
            {/* Shine sweep */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "120%", opacity: 0.3 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/60 to-transparent blur-xl pointer-events-none"
            />

            {/* Check icon */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
              className="relative w-20 h-20 mx-auto mb-5"
            >
              <div className="absolute inset-0 rounded-full bg-teal-400/25 blur-2xl" />
              <div className="relative w-full h-full rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-inner">
                <FiCheckCircle className="text-teal-600" size={40} strokeWidth={2} />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } } }}
            >
              {[
                <h2 key="title"  className="text-xl font-bold text-gray-900">Order Confirmed!</h2>,
                <p  key="sub"    className="text-sm text-gray-500 mt-2 leading-relaxed">Your order is being prepared. Estimated delivery in <strong>25–35 mins</strong>.</p>,
              ].map((el, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  {el}
                </motion.div>
              ))}

              <motion.button
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                onClick={onClose}
                className="mt-6 w-full py-3 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-900 active:scale-[0.97] transition"
              >
                Continue Browsing
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN PANEL (Registry Console)
═══════════════════════════════════════════════════════════════ */

interface AdminPanelProps {
  foodItems: FoodItem[];
  onToggle: (id: number) => void;
}

function AdminPanel({ foodItems, onToggle }: AdminPanelProps) {
  const available   = foodItems.filter((i) => i.isAvailable).length;
  const unavailable = foodItems.length - available;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Items",   value: foodItems.length, color: "text-white"      },
          { label: "Available",     value: available,        color: "text-teal-400"   },
          { label: "Unavailable",   value: unavailable,      color: "text-red-400"    },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
            <p className={`text-3xl font-bold ${color} tabular-nums`}>{value}</p>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
          <FiPackage className="text-teal-400" size={14} />
          <h2 className="text-white text-sm font-semibold">Inventory Console</h2>
          <span className="ml-auto text-xs text-gray-500">{foodItems.length} dishes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Dish</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Price</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {foodItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.025] transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${TYPE_DOT[item.type]}`} />
                          <span className="text-gray-500 capitalize">{item.type}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{item.category}</td>
                  <td className="px-5 py-3 text-teal-400 font-medium hidden md:table-cell tabular-nums">₹{item.price}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => onToggle(item.id)}
                      aria-pressed={item.isAvailable}
                      aria-label={`Toggle availability for ${item.name}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                        item.isAvailable
                          ? "border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                          : "border-red-500/30  text-red-400  hover:bg-red-500/10"
                      }`}
                    >
                      {item.isAvailable
                        ? <><FiToggleRight size={14} /> Available</>
                        : <><FiToggleLeft  size={14} /> Unavailable</>
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════ */

export default function CulinaryOS() {
  /* ── State ── */
  const [foodItems,    setFoodItems]    = useState<FoodItem[]>(INITIAL_FOOD_DATA);
  const [cart,         setCart]         = useState<CartItem[]>([]);
  const [view,         setView]         = useState<View>("user");
  const [isCartOpen,   setIsCartOpen]   = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [search,       setSearch]       = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [scrolled,     setScrolled]     = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── Keyboard shortcut: "/" to focus search ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ── Derived ── */
  const cartCount = getCartCount(cart);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return foodItems.filter((item) => {
      const matchesSearch   = !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [foodItems, search, activeCategory]);

  /* ── Cart handlers (stable refs) ── */
  const addToCart = useCallback((item: FoodItem) => {
    if (!item.isAvailable) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const incQty = useCallback((id: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }, []);

  const decQty = useCallback((id: number) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    setOrderSuccess(true);
    setCart([]);
  }, []);

  const handleOrderClose = useCallback(() => {
    setOrderSuccess(false);
  }, []);

  /* ── Admin handler ── */
  const toggleAvailability = useCallback((id: number) => {
    setFoodItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)
    );
    // If toggled off, remove from cart
    setCart((prev) => prev.filter((i) => {
      const foodItem = foodItems.find((f) => f.id === id);
      return !(i.id === id && foodItem?.isAvailable);
    }));
  }, [foodItems]);

  /* ── Cart qty lookup ── */
  const cartQtyMap = useMemo(() => {
    const map: Record<number, number> = {};
    cart.forEach((i) => { map[i.id] = i.quantity; });
    return map;
  }, [cart]);

  /* ─────────────────────────── RENDER ────────────────────────── */
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30">

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.07),transparent_55%)]" />
      </div>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav className="sticky top-0 z-40 w-full">
        {/* Glass background */}
        <div
          className={`absolute inset-0 -z-10 transition-all duration-500 ${
            scrolled ? "bg-black/80 backdrop-blur-2xl" : "bg-black/20 backdrop-blur-md"
          }`}
        />
        <div className={`absolute bottom-0 w-full h-px bg-white/10 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top row */}
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-teal-500/10 rounded-lg">
                <FiCompass className="text-teal-400 text-xl" aria-hidden="true" />
              </div>
              <span className="text-white font-bold tracking-tight text-[19px]">
                Yatri<span className="text-teal-400">Hub</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Segmented control */}
              <div
                className="relative flex bg-white/10 p-[3px] rounded-xl overflow-hidden"
                role="tablist"
                aria-label="View switcher"
              >
                {/* Slider pill */}
                <div
                  className={`absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-lg bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    view === "user" ? "left-[3px]" : "left-1/2"
                  }`}
                />
                {(["user", "admin"] as const).map((v) => (
                  <button
                    key={v}
                    role="tab"
                    aria-selected={view === v}
                    onClick={() => setView(v)}
                    className={`relative z-10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
                      view === v ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {v === "user" ? "Menu" : "Admin"}
                  </button>
                ))}
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open cart, ${cartCount} items`}
                className="relative flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 active:scale-90 transition-all duration-150"
              >
                <FiShoppingBag className="text-white" size={18} aria-hidden="true" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-teal-500 text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#050505] tabular-nums"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Hero title + search — collapses on scroll */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled || view === "admin"
                ? "max-h-0 opacity-0 -translate-y-3 pointer-events-none"
                : "max-h-40 opacity-100 translate-y-0"
            }`}
          >
            <div className="pt-3 pb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">Discover Food</h1>
            </div>
            <div className="pb-4">
              <label htmlFor="food-search" className="sr-only">Search dishes</label>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 h-12 focus-within:bg-white/[0.15] focus-within:border-white/25 transition-all duration-250">
                <FiSearch className="text-gray-400 shrink-0" aria-hidden="true" />
                <input
                  id="food-search"
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search dishes… (press "/" to focus)'
                  className="w-full bg-transparent text-base text-white placeholder-gray-500 outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="text-gray-500 hover:text-white transition"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <main>
        {view === "admin" ? (
          <AdminPanel foodItems={foodItems} onToggle={toggleAvailability} />
        ) : (
          <>
            {/* Category pills */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
              <div
                className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
                role="tablist"
                aria-label="Food categories"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest border transition-all duration-150 ${
                      activeCategory === cat
                        ? "bg-teal-500 border-teal-400 text-black"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
                  <FiSearch className="text-gray-600" size={36} />
                  <p className="text-gray-300 font-medium">No dishes found</p>
                  <p className="text-gray-500 text-sm">Try a different keyword or category</p>
                  <button
                    onClick={() => { setSearch(""); setActiveCategory("All"); }}
                    className="mt-1 text-teal-400 text-sm hover:text-teal-300 transition"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  key={`${activeCategory}-${search}`}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {filteredItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      cartQty={cartQtyMap[item.id] ?? 0}
                      onAdd={addToCart}
                      onInc={incQty}
                      onDec={decQty}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </>
        )}
      </main>

      {/* ══════════════════ OVERLAYS ══════════════════ */}
      <CartDrawer
        open={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onInc={incQty}
        onDec={decQty}
        onCheckout={handleCheckout}
      />

      <OrderSuccessOverlay
        open={orderSuccess}
        onClose={handleOrderClose}
      />
    </div>
  );
}
