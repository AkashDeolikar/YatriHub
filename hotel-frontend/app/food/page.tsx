// "use client";

// import Link from "next/link";
// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FaStar, FaFire, FaLeaf, FaWineGlassAlt, FaSearch, 
//   FaTrash, FaCheckCircle, FaChartLine, FaBoxOpen 
// } from "react-icons/fa";
// import { FiPlus, FiMinus, FiShoppingBag, FiSettings, FiX, FiCompass } from "react-icons/fi";

// // --- TYPES ---
// type FoodItem = {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   rating: number;
//   type: "veg" | "non-veg" | "alcohol";
//   time: string;
//   isAvailable: boolean;
// };

// type CartItem = FoodItem & { quantity: number };

// // --- DATA ---
// const INITIAL_FOOD_DATA: FoodItem[] = [
//   // Pizza
//   { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, rating: 4.5, type: "veg", time: "25 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop" },
//   { id: 2, name: "Farmhouse Pizza", category: "Pizza", price: 399, rating: 4.7, type: "veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1000&auto=format&fit=crop" },
//   { id: 3, name: "Pepperoni Pizza", category: "Pizza", price: 449, rating: 4.6, type: "non-veg", time: "28 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=880&auto=format&fit=crop" },

//   // Indian
//   { id: 4, name: "Butter Chicken", category: "Indian", price: 349, rating: 4.8, type: "non-veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop" },
//   { id: 5, name: "Paneer Butter Masala", category: "Indian", price: 299, rating: 4.6, type: "veg", time: "25 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop" },
//   { id: 6, name: "Chicken Biryani", category: "Indian", price: 379, rating: 4.9, type: "non-veg", time: "35 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=1000&auto=format&fit=crop" },

//   // Burgers
//   { id: 7, name: "Cheese Burger", category: "Burger", price: 199, rating: 4.3, type: "veg", time: "20 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" },
//   { id: 8, name: "Chicken Burger", category: "Burger", price: 249, rating: 4.5, type: "non-veg", time: "22 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" },

//   // Chinese
//   { id: 9, name: "Hakka Noodles", category: "Chinese", price: 229, rating: 4.4, type: "veg", time: "20 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop" },
//   { id: 10, name: "Chilli Chicken", category: "Chinese", price: 329, rating: 4.7, type: "non-veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1000&auto=format&fit=crop" },

//   // Drinks & Liquor
//   { id: 11, name: "Cold Coffee", category: "Drinks", price: 149, rating: 4.5, type: "veg", time: "10 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop" },
//   { id: 13, name: "Red Wine", category: "Liquor", price: 499, rating: 4.8, type: "alcohol", time: "5 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9?q=80&w=1170&auto=format&fit=crop" },
//   { id: 14, name: "Whiskey", category: "Liquor", price: 599, rating: 4.9, type: "alcohol", time: "5 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1638632091537-3556e098182f?q=80&w=1000&auto=format&fit=crop" },
//   { id: 15, name: "Beer", category: "Liquor", price: 299, rating: 4.6, type: "alcohol", time: "3 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1000&auto=format&fit=crop" },

//   // Starters & Soups
//   { id: 16, name: "Spring Rolls", category: "Starters", price: 199, rating: 4.5, type: "veg", time: "15 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" },
//   { id: 18, name: "Tomato Soup", category: "Soups", price: 149, rating: 4.3, type: "veg", time: "12 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop" },

//   // Desserts
//   { id: 22, name: "Chocolate Brownie", category: "Desserts", price: 149, rating: 4.8, type: "veg", time: "8 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop" },
//   { id: 23, name: "Gulab Jamun", category: "Desserts", price: 129, rating: 4.7, type: "veg", time: "10 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000&auto=format&fit=crop" },

//   // Continental & Healthy
//   { id: 25, name: "Veg Pasta", category: "Continental", price: 299, rating: 4.5, type: "veg", time: "20 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop" },
//   { id: 29, name: "Quinoa Bowl", category: "Healthy", price: 329, rating: 4.6, type: "veg", time: "15 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop" },
//   { id: 30, name: "Truffle Fries", category: "Sides", price: 179, rating: 4.4, type: "veg", time: "10 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop" },
// ];

// const CATEGORIES = ["All", "Pizza", "Indian", "Liquor", "Desserts", "Starters", "Soups"];

// export default function CulinaryKernel() {
//   const [view, setView] = useState<"user" | "owner">("user");
//   const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_DATA);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   // Filter Logic
//   const filteredFood = useMemo(() => {
//     return foodItems.filter(item => 
//       (selectedCategory === "All" || item.category === selectedCategory) &&
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [selectedCategory, search, foodItems]);

//   const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   // Handlers
//   const addToCart = (item: FoodItem) => {
//     if (!item.isAvailable) return;
//     setCart(prev => {
//       const exist = prev.find(i => i.id === item.id);
//       if (exist) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const updateQty = (id: number, delta: number) => {
//     setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0));
//   };

//   const toggleAvailability = (id: number) => {
//     setFoodItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30">

//       {/* 1. MASTER NAV */}
//       <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex items-center gap-8">
//             <Link href="/" className="group flex items-center gap-2.5 shrink-0">
//           <div className="relative">
//             <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" />
//             <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
//           </div>
//           <span className="text-xl font-bold text-white">
//             Yatri<span className="text-teal-400">Hub</span>
//           </span>
//         </Link>
//             <div className="hidden md:flex bg-white/5 p-1 rounded-xl border border-white/10">
//               <button 
//                 onClick={() => setView("user")}
//                 className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${view === "user" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
//               >
//                 Menu
//               </button>
//               <button 
//                 onClick={() => setView("owner")}
//                 className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${view === "owner" ? "bg-teal-500 text-black" : "text-gray-500 hover:text-white"}`}
//               >
//                 Admin
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="hidden lg:relative lg:block w-64">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs" />
//               <input 
//                 type="text" placeholder="SEARCH SYSTEM..." 
//                 className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-[10px] font-bold focus:border-teal-500 outline-none transition-all"
//                 value={search} onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//             <button onClick={() => setIsCartOpen(true)} className="relative h-11 w-11 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
//               <FiShoppingBag size={18} />
//               {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-black">{cart.length}</span>}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* 2. MAIN CONTENT VIEWPORT */}
//       <main className="max-w-7xl mx-auto px-6 py-10">
//         {view === "user" ? (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             {/* Category Bar */}
//             <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8">
//               {CATEGORIES.map(cat => (
//                 <button
//                   key={cat} onClick={() => setSelectedCategory(cat)}
//                   className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${selectedCategory === cat ? "bg-teal-500 border-teal-400 text-black" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"}`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredFood.map(item => (
//                 <div key={item.id} className={`group bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 ${!item.isAvailable && 'opacity-50 grayscale'}`}>
//                   <div className="h-44 relative overflow-hidden">
//                     <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                     {!item.isAvailable && (
//                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                         <span className="bg-red-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full">Sold Out</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-sm font-black uppercase tracking-tight leading-tight">{item.name}</h3>
//                       <span className="text-teal-400 font-black italic">₹{item.price}</span>
//                     </div>
//                     <div className="flex justify-between items-center mt-6">
//                       <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold">
//                         <FaStar /> {item.rating}
//                       </div>
//                       <button 
//                         disabled={!item.isAvailable}
//                         onClick={() => addToCart(item)}
//                         className="h-10 w-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all disabled:opacity-0"
//                       >
//                         <FiPlus />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
//             <div className="flex justify-between items-end">
//               <h2 className="text-4xl font-black italic tracking-tighter uppercase">Inventory Console</h2>
//               <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Updates Enabled</div>
//             </div>
//             <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden">
//               <table className="w-full text-left text-[11px] font-bold uppercase tracking-wider">
//                 <thead className="bg-white/5 text-gray-500 border-b border-white/5">
//                   <tr>
//                     <th className="p-6">Product</th>
//                     <th className="p-6">Category</th>
//                     <th className="p-6">Price</th>
//                     <th className="p-6 text-right">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {foodItems.map(item => (
//                     <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
//                       <td className="p-6 flex items-center gap-4">
//                         <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
//                         <span>{item.name}</span>
//                       </td>
//                       <td className="p-6 text-gray-500">{item.category}</td>
//                       <td className="p-6 text-teal-500">₹{item.price}</td>
//                       <td className="p-6 text-right">
//                         <button 
//                           onClick={() => toggleAvailability(item.id)}
//                           className={`px-4 py-2 rounded-full border transition-all ${item.isAvailable ? "border-green-500/30 text-green-500 hover:bg-green-500/10" : "border-red-500/30 text-red-500 hover:bg-red-500/10"}`}
//                         >
//                           {item.isAvailable ? "In Stock" : "Out of Stock"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         )}
//       </main>

//       {/* 3. SLIDE-OUT CART */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
//             <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#080808] border-l border-white/10 p-8 z-[70] flex flex-col shadow-2xl">
//               <div className="flex justify-between items-center mb-10">
//                 <h2 className="text-2xl font-black uppercase italic">The Bag</h2>
//                 <button onClick={() => setIsCartOpen(false)} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500 transition-colors"><FiX /></button>
//               </div>

//               <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
//                 {cart.length === 0 ? (
//                   <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-20 italic">
//                     <FaBoxOpen size={60} className="mb-4" />
//                     <p className="font-black uppercase tracking-[0.3em]">System Empty</p>
//                   </div>
//                 ) : cart.map(item => (
//                   <div key={item.id} className="bg-white/5 p-4 rounded-3xl border border-white/5 flex items-center gap-4">
//                     <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
//                     <div className="flex-1">
//                       <h4 className="text-[10px] font-black uppercase mb-1">{item.name}</h4>
//                       <p className="text-teal-400 font-black text-sm">₹{item.price * item.quantity}</p>
//                     </div>
//                     <div className="flex items-center gap-3 bg-black/50 p-2 rounded-xl">
//                       <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 hover:text-white"><FiMinus /></button>
//                       <span className="text-xs font-black">{item.quantity}</span>
//                       <button onClick={() => updateQty(item.id, 1)} className="text-gray-500 hover:text-white"><FiPlus /></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
//                 <div className="flex justify-between items-end">
//                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Payable</span>
//                   <span className="text-3xl font-black italic text-teal-400 leading-none">₹{cartTotal}</span>
//                 </div>
//                 <button 
//                   onClick={() => { setOrderSuccess(true); setIsCartOpen(false); setCart([]); }}
//                   disabled={cart.length === 0}
//                   className="w-full bg-white text-black py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-teal-500 hover:text-white transition-all disabled:opacity-20"
//                 >
//                   Confirm Order
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* 4. SUCCESS MODAL */}
//       <AnimatePresence>
//         {orderSuccess && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 text-center">
//             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-sm">
//               <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <FaCheckCircle className="text-teal-400 text-4xl" />
//               </div>
//               <h2 className="text-3xl font-black italic uppercase mb-2">Protocol: Confirmed</h2>
//               <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-8 leading-relaxed">Your culinary request is being processed. Dispatching drone for delivery.</p>
//               <button onClick={() => setOrderSuccess(false)} className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-500 transition-colors">Return to Console</button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegistryConsole from "../food/admin";
import {
  FaStar, FaCheckCircle, FaChartLine, FaServer,
  FaTerminal, FaShieldAlt, FaBoxOpen
} from "react-icons/fa";
import {
  FiPlus, FiMinus, FiShoppingBag, FiX,
  FiCompass, FiActivity, FiLayers
} from "react-icons/fi";

import {
  FiClock, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import {
  FaUtensils, FaConciergeBell, FaWineGlassAlt,
  FaClipboardList,
} from "react-icons/fa";
import Navbar from "../navbar";
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
  isAvailable: boolean;
};

type CartItem = FoodItem & { quantity: number };
type SystemLog = { id: number; msg: string; type: "info" | "success" | "warning" };

// --- DATA ---
const INITIAL_FOOD_DATA: FoodItem[] = [
  // Pizza
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, rating: 4.5, type: "veg", time: "25 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop" },
  { id: 2, name: "Farmhouse Pizza", category: "Pizza", price: 399, rating: 4.7, type: "veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Pepperoni Pizza", category: "Pizza", price: 449, rating: 4.6, type: "non-veg", time: "28 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=880&auto=format&fit=crop" },

  // Indian
  { id: 4, name: "Butter Chicken", category: "Indian", price: 349, rating: 4.8, type: "non-veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, name: "Paneer Butter Masala", category: "Indian", price: 299, rating: 4.6, type: "veg", time: "25 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Chicken Biryani", category: "Indian", price: 379, rating: 4.9, type: "non-veg", time: "35 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=1000&auto=format&fit=crop" },

  // Burgers
  { id: 7, name: "Cheese Burger", category: "Burger", price: 199, rating: 4.3, type: "veg", time: "20 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, name: "Chicken Burger", category: "Burger", price: 249, rating: 4.5, type: "non-veg", time: "22 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" },

  // Chinese
  { id: 9, name: "Hakka Noodles", category: "Chinese", price: 229, rating: 4.4, type: "veg", time: "20 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop" },
  { id: 10, name: "Chilli Chicken", category: "Chinese", price: 329, rating: 4.7, type: "non-veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1000&auto=format&fit=crop" },

  // Drinks & Liquor
  { id: 11, name: "Cold Coffee", category: "Drinks", price: 149, rating: 4.5, type: "veg", time: "10 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop" },
  { id: 13, name: "Red Wine", category: "Liquor", price: 499, rating: 4.8, type: "alcohol", time: "5 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9?q=80&w=1170&auto=format&fit=crop" },
  { id: 14, name: "Whiskey", category: "Liquor", price: 599, rating: 4.9, type: "alcohol", time: "5 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1638632091537-3556e098182f?q=80&w=1000&auto=format&fit=crop" },
  { id: 15, name: "Beer", category: "Liquor", price: 299, rating: 4.6, type: "alcohol", time: "3 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1000&auto=format&fit=crop" },

  // Starters & Soups
  { id: 16, name: "Spring Rolls", category: "Starters", price: 199, rating: 4.5, type: "veg", time: "15 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" },
  { id: 18, name: "Tomato Soup", category: "Soups", price: 149, rating: 4.3, type: "veg", time: "12 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop" },

  // Desserts
  { id: 22, name: "Chocolate Brownie", category: "Desserts", price: 149, rating: 4.8, type: "veg", time: "8 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop" },
  { id: 23, name: "Gulab Jamun", category: "Desserts", price: 129, rating: 4.7, type: "veg", time: "10 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000&auto=format&fit=crop" },

  // Continental & Healthy
  { id: 25, name: "Veg Pasta", category: "Continental", price: 299, rating: 4.5, type: "veg", time: "20 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop" },
  { id: 29, name: "Quinoa Bowl", category: "Healthy", price: 329, rating: 4.6, type: "veg", time: "15 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop" },
  { id: 30, name: "Truffle Fries", category: "Sides", price: 179, rating: 4.4, type: "veg", time: "10 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Pizza", "Indian", "Liquor", "Desserts"];

export default function CulinaryOS() {
  const [view, setView] = useState<"user" | "paas">("user");
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // SaaS Simulation: Background Logs
  useEffect(() => {
    const messages = ["Cache purged: instance_01", "DB Sync: 14ms", "SSL Handshake verified", "Payment Gateway: Active"];
    const interval = setInterval(() => {
      const newLog: SystemLog = {
        id: Date.now(),
        msg: messages[Math.floor(Math.random() * messages.length)],
        type: "info"
      };
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handlers
  const addToCart = (item: FoodItem) => {
    if (!item.isAvailable) return;
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0));
  };

  const toggleAvailability = (id: number) => {
    setFoodItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal-500/30">
      {/* --- MASTER HEADER --- */}
      {/* <Navbar /> */}
      <nav className="sticky top-0 z-50 bg-[#080808]/70 backdrop-blur-xl border-b border-white/[0.05] px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">

          {/* 1. BRANDING: YatriHub Food */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" />
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-light tracking-tighter text-white leading-none">
                  YatriHub <span className="text-teal-500 font-medium">Food</span>
                </span>
              </div>
            </Link>

            {/* 2. THE TOGGLE: High-Density & Pill-Shaped */}
            <div className="hidden md:flex items-center bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
              <button
                onClick={() => setView("user")}
                className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${view === "user"
                  ? "bg-white text-black shadow-xl"
                  : "text-gray-500 hover:text-white"
                  }`}
              >
                Storefront
              </button>
              <button
                onClick={() => setView("paas")}
                className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${view === "paas"
                  ? "bg-teal-500 text-black shadow-xl"
                  : "text-gray-500 hover:text-white"
                  }`}
              >
                Console
              </button>
            </div>
          </div>

          {/* 3. UTILITY: Telemetry & Cart */}
          <div className="flex items-center gap-8">
            <div className="text-right hidden lg:block border-r border-white/10 pr-8">
              <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-0.5">Deployment</p>
              <p className="text-[10px] font-mono text-teal-500/80">INDIA</p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group h-11 w-11 flex items-center justify-center rounded-full border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all"
            >
              <FiShoppingBag className="text-gray-400 group-hover:text-teal-400 transition-colors" size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#080808]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* <RegistryConsole 
        view={view}
        foodItems={foodItems}
        toggleAvailability={toggleAvailability}
        addToCart={addToCart}
        logs={logs}
      /> */}
      <RegistryConsole 
  view={view}
  foodItems={foodItems}
  toggleAvailability={toggleAvailability}
  addToCart={addToCart}
/>

      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Cinematic Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#080808] border-l border-white/5 z-[70] flex flex-col shadow-[[-20px_0_50px_rgba(0,0,0,0.5)]]"
            >
              {/* 1. COMPACT HEADER */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-light tracking-tight text-white">Order Folio</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em]">Ref: SUITE-B204</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                  <FiX className="text-gray-400" size={18} />
                </button>
              </div>

              {/* 2. HIGH-DENSITY ITEM LIST */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center opacity-20">
                    <FaUtensils size={24} />
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-4">Registry Empty</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.03]">
                    {cart.map((item: any) => (
                      <div key={item.id} className="p-6 group flex items-start gap-4 hover:bg-white/[0.01] transition-colors">
                        {/* Slim Thumbnail */}
                        <div className="h-14 w-14 shrink-0 rounded bg-black overflow-hidden border border-white/5">
                          <img src={item.image} className="h-full w-full object-cover group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-bold text-white uppercase tracking-tight truncate pr-4">{item.name}</h4>
                            <span className="text-xs font-mono text-gray-400">₹{item.price * item.quantity}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Minimalist Counter */}
                            <div className="flex items-center gap-4 py-1">
                              <button onClick={() => updateQty(item.id, -1)} className="text-gray-600 hover:text-white transition-colors"><FiMinus size={10} /></button>
                              <span className="text-[10px] font-mono text-white w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQty(item.id, 1)} className="text-gray-600 hover:text-white transition-colors"><FiPlus size={10} /></button>
                            </div>

                            <button
                              onClick={() => updateQty(item.id, -item.quantity)}
                              className="text-[8px] font-black uppercase text-gray-700 hover:text-red-500 tracking-[0.2em] transition-colors"
                            >
                              Void
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. TERMINAL STYLE SUMMARY */}
              <div className="p-6 bg-[#0a0a0a] border-t border-white/10">
                <div className="space-y-2 mb-8 font-mono">
                  <div className="flex justify-between text-[10px] text-gray-500 uppercase">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 uppercase">
                    <span>Luxury Tax (5%)</span>
                    <span>₹{(cartTotal * 0.05).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/5 mt-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white">Total Commitment</span>
                    <span className="text-3xl font-light text-teal-400 tracking-tighter italic">₹{Math.floor(cartTotal * 1.05).toLocaleString()}</span>
                  </div>
                </div>

                {/* Action: Microsoft-SaaS Style Button */}
                <button
                  onClick={() => { setOrderSuccess(true); setIsCartOpen(false); }}
                  className="w-full h-16 bg-white text-black rounded-sm font-black uppercase text-[10px] tracking-[0.5em] transition-all hover:bg-teal-500 hover:text-white active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  Transmit Payload
                </button>

                <div className="mt-8 flex justify-center items-center gap-6 opacity-40">
                  <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-gray-400">
                    <FaShieldAlt className="text-teal-500" /> Encrypted-v4
                  </div>
                  <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-gray-400">
                    <FiCheckCircle className="text-teal-500" /> PCI-DSS-Ready
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- CULINARY PROVISIONING SUCCESS OVERLAY --- */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-12 rounded-sm shadow-[0_0_100px_rgba(0,0,0,1)] text-center relative overflow-hidden"
            >
              {/* Subtle Background Grid Accent */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              {/* --- CUSTOM ANIMATED SVG ICON --- */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background Circle Path */}
                  <motion.circle
                    cx="50" cy="50" r="45"
                    fill="transparent"
                    stroke="rgba(20, 184, 166, 0.1)"
                    strokeWidth="2"
                  />
                  {/* Animated Progress Ring */}
                  <motion.circle
                    cx="50" cy="50" r="45"
                    fill="transparent"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, rotate: -90 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  {/* Animated Checkmark */}
                  <motion.path
                    d="M30 50 L45 65 L70 35"
                    fill="transparent"
                    stroke="#14b8a6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  />
                </svg>
              </div>

              {/* Content using Hospitality-PaaS Language */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <h2 className="text-xs font-black uppercase tracking-[0.1em] text-teal-500 mb-2">Transaction Finalized</h2>
                <h3 className="text-2xl font-serif italic text-white mb-4">Folio Invoiced Successfully</h3>

                <div className="space-y-4 mb-10">
                  <div className="bg-white/5 border border-white/5 py-3 px-4 rounded-sm flex justify-between items-center">
                    <span className="text-[9px] text-gray-500 uppercase">Routing Status</span>
                    <span className="text-[9px] text-teal-400 font-bold uppercase">Sent to Kitchen Station 01</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-normal leading-relaxed px-4">
                    The kitchen team has been notified. Estimated preparation window is being calculated by the local instance.
                  </p>
                </div>

                <button
                  onClick={() => setOrderSuccess(false)}
                  className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.1em] hover:bg-teal-500 hover:text-white transition-all rounded-sm shadow-xl"
                >
                  Return to Management Console
                </button>
              </motion.div>

              {/* Footer Technical Detail */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="mt-8 text-[8px] font-mono text-gray-700 uppercase"
              >
                Auth Token: {Math.random().toString(16).slice(2, 18).toUpperCase()}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}