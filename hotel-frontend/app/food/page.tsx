// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaTimes } from "react-icons/fa";

// type FoodItem = {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     image: string;
//     rating: number;
//     type: "veg" | "non-veg" | "alcohol";
//     time: string;
// };

// type CartItem = FoodItem & { quantity: number };

// const TAX_PERCENT = 0.05; // 5% tax
// const DELIVERY_CHARGE = 50; // flat delivery fee

// const foodData: FoodItem[] = [
//     // Pizza
//     { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, rating: 4.5, type: "veg", time: "25 mins", image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { id: 2, name: "Farmhouse Pizza", category: "Pizza", price: 399, rating: 4.7, type: "veg", time: "30 mins", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65" },
//     { id: 3, name: "Pepperoni Pizza", category: "Pizza", price: 449, rating: 4.6, type: "non-veg", time: "28 mins", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

//     // Indian
//     { id: 4, name: "Butter Chicken", category: "Indian", price: 349, rating: 4.8, type: "non-veg", time: "30 mins", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398" },
//     { id: 5, name: "Paneer Butter Masala", category: "Indian", price: 299, rating: 4.6, type: "veg", time: "25 mins", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7" },
//     { id: 6, name: "Chicken Biryani", category: "Indian", price: 379, rating: 4.9, type: "non-veg", time: "35 mins", image: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

//     // Burgers
//     { id: 7, name: "Cheese Burger", category: "Burger", price: 199, rating: 4.3, type: "veg", time: "20 mins", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
//     { id: 8, name: "Chicken Burger", category: "Burger", price: 249, rating: 4.5, type: "non-veg", time: "22 mins", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },

//     // Chinese
//     { id: 9, name: "Hakka Noodles", category: "Chinese", price: 229, rating: 4.4, type: "veg", time: "20 mins", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
//     { id: 10, name: "Chilli Chicken", category: "Chinese", price: 329, rating: 4.7, type: "non-veg", time: "30 mins", image: "https://plus.unsplash.com/premium_photo-1675864532625-60efd11cde54?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

//     // Drinks
//     { id: 11, name: "Cold Coffee", category: "Drinks", price: 149, rating: 4.5, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
//     { id: 12, name: "Fresh Lime Soda", category: "Drinks", price: 99, rating: 4.2, type: "veg", time: "8 mins", image: "https://plus.unsplash.com/premium_photo-1661540754348-50ae254e4a3b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

//     // Liquor
//     { id: 13, name: "Red Wine", category: "Liquor", price: 499, rating: 4.8, type: "alcohol", time: "5 mins", image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { id: 14, name: "Whiskey", category: "Liquor", price: 599, rating: 4.9, type: "alcohol", time: "5 mins", image: "https://images.unsplash.com/photo-1638632091537-3556e098182f?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { id: 15, name: "Beer", category: "Liquor", price: 299, rating: 4.6, type: "alcohol", time: "3 mins", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

//     // Starters
//     { id: 16, name: "Spring Rolls", category: "Starters", price: 199, rating: 4.5, type: "veg", time: "15 mins", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" },
//     { id: 17, name: "Chicken Wings", category: "Starters", price: 249, rating: 4.7, type: "non-veg", time: "20 mins", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1000&auto=format&fit=crop" },

//     // Soups
//     { id: 18, name: "Tomato Soup", category: "Soups", price: 149, rating: 4.3, type: "veg", time: "12 mins", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop" },
//     { id: 19, name: "Chicken Corn Soup", category: "Soups", price: 179, rating: 4.5, type: "non-veg", time: "15 mins", image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1000&auto=format&fit=crop" },

//     // Salads
//     { id: 20, name: "Greek Salad", category: "Salads", price: 199, rating: 4.4, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop" },
//     { id: 21, name: "Chicken Caesar Salad", category: "Salads", price: 249, rating: 4.6, type: "non-veg", time: "12 mins", image: "https://images.unsplash.com/photo-1550317138-10000687ad32?q=80&w=1000&auto=format&fit=crop" },

//     // Desserts
//     { id: 22, name: "Chocolate Brownie", category: "Desserts", price: 149, rating: 4.8, type: "veg", time: "8 mins", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop" },
//     { id: 23, name: "Gulab Jamun", category: "Desserts", price: 129, rating: 4.7, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000&auto=format&fit=crop" },

//     // Continental
//     { id: 24, name: "Grilled Fish", category: "Continental", price: 399, rating: 4.9, type: "non-veg", time: "25 mins", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=1000&auto=format&fit=crop" },
//     { id: 25, name: "Veg Pasta", category: "Continental", price: 299, rating: 4.5, type: "veg", time: "20 mins", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop" }
// ];

// export default function FoodPage() {
//     const [cart, setCart] = useState<CartItem[]>([]);
//     const [openCart, setOpenCart] = useState(false);
//     const [coupon, setCoupon] = useState("");
//     const [discount, setDiscount] = useState(0);
//     const [orderSuccess, setOrderSuccess] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [search, setSearch] = useState("");

//     const categories = ["All", "Pizza", "Indian", "Burger", "Chinese", "Drinks", "Liquor", "Starters", "Soups", "Salads", "Desserts", "Continental"];

//     const filteredFood = foodData
//         .filter((item) => (selectedCategory === "All" ? true : item.category === selectedCategory))
//         .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

//     useEffect(() => {
//         const stored = localStorage.getItem("hotel-cart");
//         if (stored) setCart(JSON.parse(stored));
//     }, []);

//     useEffect(() => {
//         localStorage.setItem("hotel-cart", JSON.stringify(cart));
//     }, [cart]);

//     const addToCart = (item: FoodItem) => {
//         setCart((prev) => {
//             const exist = prev.find((i) => i.id === item.id);
//             if (exist) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
//             return [...prev, { ...item, quantity: 1 }];
//         });
//         setOpenCart(true);
//     };

//     const updateQty = (id: number, change: number) => {
//         setCart((prev) =>
//             prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
//                 .filter((item) => item.quantity > 0)
//         );
//     };

//     const removeItem = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

//     const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const tax = subtotal * TAX_PERCENT;
//     const total = subtotal + tax + DELIVERY_CHARGE - discount;

//     const applyCoupon = () => {
//         const code = coupon.trim().toUpperCase();
//         if (code === "HOTEL50") setDiscount(50);
//         else if (code === "HUNGRY100") setDiscount(100);
//         else if (code === "SAVE10") setDiscount(subtotal * 0.1);
//         else alert("Invalid Coupon");
//     };

//     const checkout = async () => {
//         if (!cart.length) return alert("Cart is empty!");
//         try {
//             const res = await fetch("http://localhost:4000/food/order", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     userId: "demo-user-id",
//                     items: cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
//                 }),
//             });
//             if (res.ok) {
//                 setCart([]); setDiscount(0); setCoupon(""); setOrderSuccess(true); setOpenCart(false);
//             } else alert("Order failed");
//         } catch (err) {
//             console.error(err); alert("Server not reachable");
//         }
//     };

//     const renderStars = (rating: number) => {
//         const stars = [];
//         for (let i = 1; i <= 5; i++) {
//             if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
//             else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//             else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
//         }
//         return stars;
//     };

//     return (
//         <div className="min-h-screen bg-black text-white">
//             {/* NAV */}
//             <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
//                 <Link href="/" className="text-2xl font-bold">Hotel<span className="text-indigo-400">OS</span></Link>
//                 <button onClick={() => setOpenCart(true)} className="relative bg-indigo-500 px-6 py-2 rounded-full">
//                     Cart
//                     <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-yellow-400 text-black w-6 h-6 flex items-center justify-center rounded-full text-sm">
//                         {cart.length}
//                     </motion.span>
//                 </button>
//             </nav>

//             {/* CATEGORY + SEARCH */}
//             <div className="flex gap-4 flex-wrap max-w-7xl mx-auto px-6 mt-6 items-center">
//                 {categories.map(cat => (
//                     <motion.button key={cat} onClick={() => setSelectedCategory(cat)} whileTap={{ scale: 0.95 }}
//                         className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? "bg-indigo-500 border-indigo-500" : "border-gray-700"}`}>
//                         {cat}
//                     </motion.button>
//                 ))}
//                 <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
//                     className="ml-auto bg-gray-800 px-4 py-2 rounded-full text-black placeholder-gray-600" />
//             </div>

//             {/* FOOD GRID */}
//             <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 mt-10">
//                 {filteredFood.map(item => (
//                     <motion.div key={item.id} whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.5)" }} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden relative">
//                         <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
//                         <div className="p-6">
//                             <div className="flex justify-between items-center mb-2">
//                                 <h3 className="text-xl font-semibold">{item.name}</h3>
//                                 <span className={`text-xs px-2 py-1 rounded ${item.type === "veg" ? "bg-green-600" : item.type === "non-veg" ? "bg-red-600" : "bg-purple-600"}`}>{item.type}</span>
//                             </div>
//                             <div className="flex items-center mb-2">{renderStars(item.rating)}</div>
//                             <p className="text-gray-400 text-sm mb-2">⏱️ {item.time}</p>
//                             <p className="text-indigo-400 font-bold mb-4">₹ {item.price}</p>
//                             <button onClick={() => addToCart(item)} className="w-full bg-indigo-500 hover:bg-indigo-400 py-2 rounded-full">Add to Cart</button>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>

//             {/* CART PANEL */}
//             <AnimatePresence>
//                 {openCart && (
//                     <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 h-full w-96 bg-gray-900 p-6 z-50 flex flex-col">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-bold">Your Cart</h2>
//                             <button onClick={() => setOpenCart(false)}><FaTimes /></button>
//                         </div>
//                         <div className="flex-1 overflow-y-auto">
//                             {cart.length === 0 && <p className="text-gray-400">Cart is empty.</p>}
//                             {cart.map(item => (
//                                 <div key={item.id} className="flex justify-between mb-4 items-center">
//                                     <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover mr-2" />
//                                     <div className="flex-1">{item.name}<p className="text-sm text-gray-400">₹ {item.price}</p></div>
//                                     <div className="flex items-center gap-2">
//                                         <button onClick={() => updateQty(item.id, -1)} className="bg-gray-700 px-2 rounded">-</button>
//                                         {item.quantity}
//                                         <button onClick={() => updateQty(item.id, 1)} className="bg-gray-700 px-2 rounded">+</button>
//                                         <button onClick={() => removeItem(item.id)} className="ml-2 text-red-500"><FaTimes /></button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="mt-4 border-t border-gray-700 pt-4 space-y-1">
//                             <input type="text" placeholder="Coupon Code" value={coupon} onChange={e => setCoupon(e.target.value)}
//                                 className="w-full bg-gray-800 px-3 py-2 rounded mb-3 text-black" />
//                             <button onClick={applyCoupon} className="w-full bg-yellow-500 text-black py-2 rounded mb-4">Apply Coupon</button>
//                             <p className="flex justify-between"><span>Subtotal</span><span>₹ {subtotal}</span></p>
//                             <p className="flex justify-between text-green-400"><span>Discount</span><span>- ₹ {discount}</span></p>
//                             <p className="flex justify-between"><span>Tax (5%)</span><span>₹ {tax.toFixed(0)}</span></p>
//                             <p className="flex justify-between"><span>Delivery Fee</span><span>₹ {DELIVERY_CHARGE}</span></p>
//                             <p className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>₹ {total.toFixed(0)}</span></p>
//                             <button onClick={checkout} disabled={!cart.length} className="w-full bg-indigo-500 py-3 rounded-full mt-6 disabled:opacity-50">Checkout</button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* ORDER SUCCESS */}
//             <AnimatePresence>
//                 {orderSuccess && (
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//                         <div className="bg-gray-900 p-10 rounded-2xl text-center">
//                             <h2 className="text-2xl font-bold mb-4">🎉 Order Placed!</h2>
//                             <p className="text-gray-400 mb-6">Your order is being prepared.</p>
//                             <button onClick={() => setOrderSuccess(false)} className="bg-indigo-500 px-6 py-2 rounded-full">Close</button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    FaStar,
    FaTimes,
    FaShoppingBag,
    FaSearch,
    FaTrash,
    FaCheckCircle
} from "react-icons/fa";

// --- TYPES ---
type FoodItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    type: "veg" | "non-veg" | "alcohol";
    time: string;
};

type CartItem = FoodItem & { quantity: number };

// --- CONSTANTS ---
const TAX_PERCENT = 0.05;
const DELIVERY_CHARGE = 50;

// --- DATA ---
const foodData: FoodItem[] = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, rating: 4.5, type: "veg", time: "25 mins", image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Farmhouse Pizza", category: "Pizza", price: 399, rating: 4.7, type: "veg", time: "30 mins", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65" },
    { id: 3, name: "Pepperoni Pizza", category: "Pizza", price: 449, rating: 4.6, type: "non-veg", time: "28 mins", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Indian
    { id: 4, name: "Butter Chicken", category: "Indian", price: 349, rating: 4.8, type: "non-veg", time: "30 mins", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398" },
    { id: 5, name: "Paneer Butter Masala", category: "Indian", price: 299, rating: 4.6, type: "veg", time: "25 mins", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7" },
    { id: 6, name: "Chicken Biryani", category: "Indian", price: 379, rating: 4.9, type: "non-veg", time: "35 mins", image: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Burgers
    { id: 7, name: "Cheese Burger", category: "Burger", price: 199, rating: 4.3, type: "veg", time: "20 mins", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 8, name: "Chicken Burger", category: "Burger", price: 249, rating: 4.5, type: "non-veg", time: "22 mins", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },

    // Chinese
    { id: 9, name: "Hakka Noodles", category: "Chinese", price: 229, rating: 4.4, type: "veg", time: "20 mins", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
    { id: 10, name: "Chilli Chicken", category: "Chinese", price: 329, rating: 4.7, type: "non-veg", time: "30 mins", image: "https://plus.unsplash.com/premium_photo-1675864532625-60efd11cde54?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Drinks
    { id: 11, name: "Cold Coffee", category: "Drinks", price: 149, rating: 4.5, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { id: 12, name: "Fresh Lime Soda", category: "Drinks", price: 99, rating: 4.2, type: "veg", time: "8 mins", image: "https://plus.unsplash.com/premium_photo-1661540754348-50ae254e4a3b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Liquor
    { id: 13, name: "Red Wine", category: "Liquor", price: 499, rating: 4.8, type: "alcohol", time: "5 mins", image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 14, name: "Whiskey", category: "Liquor", price: 599, rating: 4.9, type: "alcohol", time: "5 mins", image: "https://images.unsplash.com/photo-1638632091537-3556e098182f?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 15, name: "Beer", category: "Liquor", price: 299, rating: 4.6, type: "alcohol", time: "3 mins", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Starters
    { id: 16, name: "Spring Rolls", category: "Starters", price: 199, rating: 4.5, type: "veg", time: "15 mins", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" },
    { id: 17, name: "Chicken Wings", category: "Starters", price: 249, rating: 4.7, type: "non-veg", time: "20 mins", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1000&auto=format&fit=crop" },

    // Soups
    { id: 18, name: "Tomato Soup", category: "Soups", price: 149, rating: 4.3, type: "veg", time: "12 mins", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop" },
    { id: 19, name: "Chicken Corn Soup", category: "Soups", price: 179, rating: 4.5, type: "non-veg", time: "15 mins", image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1000&auto=format&fit=crop" },

    // Salads
    { id: 20, name: "Greek Salad", category: "Salads", price: 199, rating: 4.4, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop" },
    { id: 21, name: "Chicken Caesar Salad", category: "Salads", price: 249, rating: 4.6, type: "non-veg", time: "12 mins", image: "https://images.unsplash.com/photo-1550317138-10000687ad32?q=80&w=1000&auto=format&fit=crop" },

    // Desserts
    { id: 22, name: "Chocolate Brownie", category: "Desserts", price: 149, rating: 4.8, type: "veg", time: "8 mins", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop" },
    { id: 23, name: "Gulab Jamun", category: "Desserts", price: 129, rating: 4.7, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000&auto=format&fit=crop" },

    // Continental
    { id: 24, name: "Grilled Fish", category: "Continental", price: 399, rating: 4.9, type: "non-veg", time: "25 mins", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=1000&auto=format&fit=crop" },
    { id: 25, name: "Veg Pasta", category: "Continental", price: 299, rating: 4.5, type: "veg", time: "20 mins", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop" },

    // Breakfast
    { id: 26, name: "Eggs Benedict", category: "Breakfast", price: 249, rating: 4.7, type: "non-veg", time: "15 mins", image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=1000&auto=format&fit=crop" },
    { id: 27, name: "Avocado Toast", category: "Breakfast", price: 199, rating: 4.5, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop" },

    // Sushi
    { id: 28, name: "California Roll", category: "Sushi", price: 499, rating: 4.8, type: "non-veg", time: "20 mins", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop" },
    
    // Healthy
    { id: 29, name: "Quinoa Bowl", category: "Healthy", price: 329, rating: 4.6, type: "veg", time: "15 mins", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop" },

    // Sides
    { id: 30, name: "Truffle Fries", category: "Sides", price: 179, rating: 4.4, type: "veg", time: "10 mins", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop" },

    { id: 31, name: "Gin & Tonic", category: "Liquor", price: 349, rating: 4.5, type: "alcohol", time: "5 mins", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1170&auto=format&fit=crop" },
    { id: 32, name: "Vodka Shot", category: "Liquor", price: 199, rating: 4.3, type: "alcohol", time: "2 mins", image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=1170&auto=format&fit=crop" },
    { id: 33, name: "Old Fashioned", category: "Liquor", price: 449, rating: 4.8, type: "alcohol", time: "6 mins", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1170&auto=format&fit=crop" },

];


export default function FoodPage() {
    // State
    const [cart, setCart] = useState<CartItem[]>([]);
    const [openCart, setOpenCart] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    const categories = ["All", "Pizza", "Indian", "Burger", "Chinese", "Drinks", "Liquor", "Starters", "Soups", "Salads", "Desserts", "Continental", "Breakfast","Sushi","Healthy","Sides"];

    // Hydration fix
    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("hotel-cart");
        if (stored) {
            try {
                setCart(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("hotel-cart", JSON.stringify(cart));
        }
    }, [cart, mounted]);

    const filteredFood = foodData
        .filter((item) => (selectedCategory === "All" ? true : item.category === selectedCategory))
        .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    const addToCart = (item: FoodItem) => {
        setCart((prev) => {
            const exist = prev.find((i) => i.id === item.id);
            if (exist) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { ...item, quantity: 1 }];
        });
        setOpenCart(true);
    };

    const updateQty = (id: number, change: number) => {
        setCart((prev) =>
            prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_PERCENT;
    const total = Math.max(0, subtotal + tax + DELIVERY_CHARGE - discount);

    const applyCoupon = () => {
        const code = coupon.trim().toUpperCase();
        if (code === "HOTEL50") setDiscount(50);
        else if (code === "HUNGRY100") setDiscount(100);
        else if (code === "SAVE10") setDiscount(subtotal * 0.1);
        else alert("Invalid Coupon");
    };

    const checkout = () => {
        if (!cart.length) return;
        setOrderSuccess(true);
        setOpenCart(false);
        setCart([]);
    };

    if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-sans">
            {/* STICKY NAV */}
            <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-white/5 bg-black/60 px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold ">
                        HOTEL<span className="text-indigo-500">OS</span>
                    </Link>

                    <button
                        onClick={() => setOpenCart(true)}
                        className="relative group bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all"
                    >
                        <FaShoppingBag />
                        <span>Terminal Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] border-2 border-black">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-5xl font-black italic tracking-tighter mb-8 text-white">CULINARY KERNEL</h1>

                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/5 p-4 rounded-[2rem] border border-white/5 shadow-2xl">
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar max-w-full md:max-w-[70%]">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-64">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                type="text"
                                placeholder="SEARCH MENU..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest focus:border-indigo-500 outline-none transition-all text-white"
                            />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFood.map(item => (
                        <motion.div layout key={item.id} className="group bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
                            <div className="relative h-56 overflow-hidden">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4">
                                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border backdrop-blur-md ${item.type === "veg" ? "bg-green-500/20 border-green-500/50 text-green-500" :
                                        item.type === "non-veg" ? "bg-red-500/20 border-red-500/50 text-red-500" :
                                            "bg-purple-500/20 border-purple-500/50 text-purple-400"
                                        }`}>
                                        {item.type}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{item.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                                        <FaStar /> <span className="font-bold text-gray-300">{item.rating}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Prepared in {item.time}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-2xl font-black italic text-white">₹{item.price}</span>
                                    <button onClick={() => addToCart(item)} className="bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-indigo-500 hover:text-white transition-all">
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* CART SIDEBAR */}
            <AnimatePresence>
                {openCart && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenCart(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#080808] border-l border-white/10 p-8 z-[60] flex flex-col shadow-2xl">
                            <div className="flex justify-between items-center mb-10">
                                <div><h2 className="text-2xl font-black uppercase text-white">Current Order</h2></div>
                                <button onClick={() => setOpenCart(false)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white"><FaTimes /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-6">
                                {cart.length === 0 ? <p className="text-center text-gray-500 uppercase text-xs font-black">Empty</p> : cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-3xl border border-white/5">
                                        <img src={item.image} alt={item.name} className="h-12 w-12 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-white">{item.name}</h4>
                                            <p className="text-xs text-indigo-400">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-black px-2 py-1 rounded-full border border-white/10">
                                            <button onClick={() => updateQty(item.id, -1)} className="text-white">-</button>
                                            <span className="text-xs font-bold text-white">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="text-white">+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500"><FaTrash size={12} /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                                <div className="flex justify-between text-[12px] font-bold uppercase text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-[12px] font-bold uppercase text-gray-500">
                                    <span>Service Tax (5%)</span>
                                    <span>₹{tax.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-[12px] font-bold uppercase text-gray-500">
                                    <span>Delivery</span>
                                    <span>₹{DELIVERY_CHARGE}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-[12px] font-bold uppercase text-green-500">
                                        <span>Discount</span>
                                        <span>- ₹{discount.toFixed(0)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xs font-bold uppercase text-gray-400"><span>Total Payable</span><span className="text-2xl font-blac2 text-indigo-400">₹{total.toFixed(0)}</span></div>
                                <button onClick={checkout} disabled={!cart.length} className="w-full bg-white text-black py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-20">Confirm Order</button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* SUCCESS OVERLAY */}
            <AnimatePresence>
                {orderSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-6">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0a0a0a] border border-indigo-500/30 p-12 rounded-[3rem] text-center max-w-sm">
                            <FaCheckCircle className="text-indigo-400 text-5xl mx-auto mb-6" />
                            <h2 className="text-2xl font-black uppercase text-white mb-2">ORDER_VALIDATED</h2>
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-8">Delivery drone dispatched to your unit.</p>
                            <button onClick={() => setOrderSuccess(false)} className="w-full bg-white text-black py-3 rounded-full text-xs font-black uppercase transition-all hover:bg-indigo-500 hover:text-white">Back to Console</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}