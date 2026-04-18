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
  FiPlus, FiMinus, FiShoppingBag, FiX, FiCompass,
  FiSearch
} from "react-icons/fi";
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const filteredItems = useMemo(() => {
    return foodItems.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [foodItems, search]);

  if (!foodItems.length) {
    return <p className="text-center text-gray-400">No items found</p>;
  }
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

  const [scrolled, setScrolled] = useState(false);

  /* 📜 detect scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal-500/30">
      {/* --- MASTER HEADER --- */}
      {/* <Navbar /> */}
      <nav className="sticky top-0 z-50 w-full overflow-hidden">
        {/* 🧊 GLASS MORPHISM BACKGROUND */}
        <div
          className={`
          absolute inset-0 -z-10
          transition-all duration-700 ease-in-out
          ${scrolled
              ? "bg-black/80 backdrop-blur-2xl saturate-150"
              : "bg-black/20 backdrop-blur-md saturate-100"}
        `}
        />

        {/* ⚡️ HAIRLINE BORDERS (True iOS style) */}
        <div className="absolute top-0 w-full h-[0.5px] bg-white/15" />
        <div className={`
        absolute bottom-0 w-full h-[0.5px] bg-white/10 transition-opacity duration-500
        ${scrolled ? "opacity-100" : "opacity-0"}
      `} />

        <div className="max-w-7xl mx-auto px-5">

          {/* 🔝 TOP NAVIGATION ROW */}
          <div className="flex items-center justify-between h-14">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group active:scale-95 transition-transform duration-200"
            >
              <div className="p-1.5 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <FiCompass className="text-teal-400 text-xl" />
              </div>
              <span className="text-white font-bold tracking-tight text-[19px]">
                YatriHub
              </span>
            </Link>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">

              {/* 🍏 SEGMENTED CONTROL */}
              <div className="hidden sm:flex relative bg-white/10 p-[3px] rounded-xl w-36">
                <div
                  className={`
                  absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-lg bg-white
                  shadow-lg transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)
                  ${view === "user" ? "left-[3px]" : "left-1/2"}
                `}
                />
                <button
                  onClick={() => setView("user")}
                  className={`relative z-10 flex-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300
                  ${view === "user" ? "text-black" : "text-gray-400 hover:text-white"}`}
                >
                  User
                </button>
                <button
                  onClick={() => setView("paas")}
                  className={`relative z-10 flex-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300
                  ${view === "paas" ? "text-black" : "text-gray-400 hover:text-white"}`}
                >
                  Admin
                </button>
              </div>

              {/* 🛒 CART BUTTON */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="
                relative flex items-center justify-center
                h-10 w-10 rounded-full
                bg-white/10 border border-white/5
                hover:bg-white/20 active:scale-90 
                transition-all duration-200
              "
                aria-label="Open Cart"
              >
                <FiShoppingBag className="text-white text-lg" />
                {cart.length > 0 && (
                  <span className="
                  absolute -top-1 -right-1
                  bg-teal-500 text-black text-[10px] font-bold
                  h-5 w-5 flex items-center justify-center
                  rounded-full shadow-lg border-2 border-black
                ">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 🧠 DYNAMIC LARGE TITLE & SEARCH AREA */}
          <div className={`
          overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled ? "max-h-0 opacity-0 translate-y-[-20px]" : "max-h-40 opacity-100 translate-y-0"}
        `}>
            <div className="py-4">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Discover Food
              </h1>
            </div>

            {/* 🔍 SEARCH BAR */}
            <div className="pb-5">
              <div className="
              group flex items-center gap-3
              bg-white/10 backdrop-blur-xl
              border border-white/10 rounded-2xl
              px-4 h-12
              focus-within:bg-white/[0.15] focus-within:border-white/25
              transition-all duration-300
            ">
                <FiSearch className="text-gray-400 group-focus-within:text-teal-400 transition-colors" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search restaurants, dishes..."
                  className="
                  w-full bg-transparent
                  text-[16px] text-white placeholder-gray-500
                  outline-none
                "
                />
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* <RegistryConsole
        view={view}
        foodItems={foodItems}
        toggleAvailability={toggleAvailability}
        addToCart={addToCart}
      /> */}
      {view === "paas" ? (
        <RegistryConsole
          view={view}
          foodItems={foodItems}
          toggleAvailability={toggleAvailability}
          addToCart={addToCart}
        />
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No dishes found
            </div>
          ) : (
            <FoodGrid foodItems={filteredItems} addToCart={addToCart} />
          )}
        </>
      )}

      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* ================= BACKDROP ================= */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* ================= DRAWER ================= */}
            <motion.aside
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
              role="dialog"
              aria-label="Shopping cart"
              className="
          fixed right-0 top-0 z-[60]
          h-full w-full max-w-md
          bg-[#0b0b0b]
          border-l border-white/10
          flex flex-col
        "
            >
              {/* ================= HEADER ================= */}
              <header className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-white font-semibold text-base">
                    Cart
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </p>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart"
                  className="
              h-9 w-9 rounded-md
              flex items-center justify-center
              hover:bg-white/10 active:scale-95 transition
            "
                >
                  <FiX size={16} />
                </button>
              </header>

              {/* ================= CONTENT ================= */}
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <FiShoppingBag className="text-gray-500 mb-3" size={22} />
                    <p className="text-gray-300 text-sm">Your cart is empty</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Add items to continue
                    </p>

                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-5 text-sm text-teal-400 hover:text-teal-300"
                    >
                      Continue browsing
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-white/5">
                    {cart.map((item: CartItem) => (
                      <li
                        key={item.id}
                        className="
                    flex gap-4 px-5 py-4
                    hover:bg-white/[0.03]
                    transition
                  "
                      >
                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-md object-cover"
                        />

                        {/* DETAILS */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">
                            {item.name}
                          </p>

                          <p className="text-gray-400 text-xs mt-0.5">
                            ₹{item.price} each
                          </p>

                          {/* QUANTITY CONTROLS */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="
                          h-7 w-7 rounded
                          border border-white/10
                          flex items-center justify-center
                          hover:bg-white/10 active:scale-95
                        "
                            >
                              <FiMinus size={12} />
                            </button>

                            <span className="text-white text-sm w-6 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="
                          h-7 w-7 rounded
                          border border-white/10
                          flex items-center justify-center
                          hover:bg-white/10 active:scale-95
                        "
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* PRICE */}
                        <div className="text-white text-sm font-medium">
                          ₹{item.price * item.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ================= FOOTER ================= */}
              {cart.length > 0 && (
                <footer className="border-t border-white/10 px-5 py-4 bg-black">
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span>Delivery</span>
                      <span>₹40</span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span>Taxes</span>
                      <span>₹{Math.floor(cartTotal * 0.05)}</span>
                    </div>

                    <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>
                        ₹{cartTotal + 40 + Math.floor(cartTotal * 0.05)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setOrderSuccess(true);
                      setIsCartOpen(false);
                    }}
                    className="
                w-full py-3 rounded-md
                bg-teal-500 text-black font-medium
                hover:bg-teal-400 active:scale-[0.98]
                transition
              "
                  >
                    Checkout
                  </button>
                </footer>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      //mark-os
      {/* --- CULINARY PROVISIONING SUCCESS OVERLAY --- */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={() => setOrderSuccess(false)}
          >
            {/* 🌌 layered backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/45 backdrop-blur-xl"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_60%)]" />

            {/* 🧊 modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 80, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
                mass: 0.8,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
          relative w-full max-w-sm
          rounded-[30px]
          bg-white/65 backdrop-blur-2xl
          border border-white/40
          shadow-[0_30px_100px_rgba(0,0,0,0.45)]
          p-6 text-center overflow-hidden
        "
            >
              {/* ✨ light sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: 0.25 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/40 to-transparent blur-xl"
              />

              {/* ✅ success orb */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                  delay: 0.25,
                }}
                className="relative w-20 h-20 mx-auto mb-6"
              >
                <div className="absolute inset-0 rounded-full bg-green-400/30 blur-3xl" />

                <div className="relative w-full h-full rounded-full bg-white/70 backdrop-blur-xl flex items-center justify-center shadow-inner">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.55,
                        ease: "easeInOut",
                        delay: 0.35,
                      }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* 🧠 content cascade */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
                  },
                }}
              >
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-xl font-semibold text-gray-900"
                >
                  Order Confirmed
                </motion.h2>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="text-sm text-gray-600 mt-2 leading-relaxed"
                >
                  Your order is being prepared. You’ll receive updates shortly.
                </motion.p>

                {/* ⏱ ETA */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="
              mt-6 rounded-xl
              bg-white/60 backdrop-blur-md
              border border-white/30
              py-3
            "
                >
                  <p className="text-xs text-gray-500">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-gray-900">
                    25–30 mins
                  </p>
                </motion.div>

                {/* 🔘 actions */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="mt-6 space-y-3"
                >
                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      setCart([]);
                    }}
                    className="
                w-full py-3 rounded-xl
                bg-black text-white font-medium
                shadow-lg
                active:scale-[0.96]
                hover:shadow-xl
                transition
              "
                  >
                    Continue Browsing
                  </button>

                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      setCart([]);
                      setIsCartOpen(true);
                    }}
                    className="
                w-full py-2 text-sm text-gray-500
                hover:text-black
                transition
              "
                  >
                    View Cart Again
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FoodGrid({ foodItems, addToCart, }: { foodItems: FoodItem[]; addToCart: (item: FoodItem) => void; }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {foodItems.map((item) => (
        <div
          key={item.id}
          className="bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:scale-[1.02] transition"
        >
          <img
            src={item.image}
            className="h-40 w-full object-cover"
          />

          <div className="p-4">

            {/* 🔴 VEG / NON-VEG INDICATOR */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`h-2 w-2 rounded-full ${item.type === "veg" ? "bg-green-500" :
                item.type === "non-veg" ? "bg-red-500" :
                  "bg-yellow-500"
                }`} />
              <span className="text-[10px] text-gray-500 uppercase">
                {item.type}
              </span>
            </div>

            {/* 🍽 FOOD NAME */}
            <h3 className="text-sm font-semibold text-white">
              {item.name}
            </h3>

            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-yellow-400 font-medium">
                ⭐ {item.rating}
              </span>
              <span className="text-gray-400">
                {item.time}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm font-medium text-white">
                ₹{item.price}
              </span>

              <button
                onClick={() => addToCart(item)}
                disabled={!item.isAvailable}
                className="px-3 py-1 text-xs bg-teal-500 text-black rounded hover:bg-teal-400 disabled:opacity-40"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}