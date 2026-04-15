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
  FiPlus, FiMinus, FiShoppingBag, FiX, FiCompass
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

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal-500/30">
      {/* --- MASTER HEADER --- */}
      {/* <Navbar /> */}
      <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* LEFT: LOGO + LOCATION */}
          <div className="flex items-center gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <FiCompass className="text-teal-500 text-xl" />
              <span className="text-white font-semibold text-lg tracking-tight">
                YatriHub
              </span>
            </Link>

            {/* Location (like Swiggy/Zomato) */}
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-xs text-gray-400">Delivery to</span>
              <span className="text-sm text-white font-medium">
                Nagpur, India
              </span>
            </div>
          </div>

          {/* CENTER: SEARCH BAR */}
          <div className="flex-1 hidden md:flex">
            <div className="w-full max-w-xl mx-auto relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for dishes..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
              />
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">

            {/* Toggle (cleaner) */}
            <div className="hidden md:flex bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setView("user")}
                className={`px-3 py-1 text-xs rounded-md transition ${view === "user"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                User
              </button>

              <button
                onClick={() => setView("paas")}
                className={`px-3 py-1 text-xs rounded-md transition ${view === "paas"
                  ? "bg-teal-500 text-black"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Admin
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-black font-medium hover:bg-teal-400 transition"
            >
              <FiShoppingBag size={16} />
              <span className="hidden sm:block text-sm">Cart</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full border border-white/10">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search food..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500"
          />
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
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f0f] z-[60] flex flex-col border-l border-white/10"
            >

              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-semibold text-white">Your Cart</h2>
                  <p className="text-xs text-gray-400">
                    {cart.length} items
                  </p>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* ITEMS */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <p className="text-gray-400 text-sm">Your cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-sm text-teal-400 hover:underline"
                    >
                      Browse menu
                    </button>
                  </div>
                ) : (
                  cart.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center border-b border-white/5 pb-4"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          ₹{item.price}
                        </p>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="h-7 w-7 flex items-center justify-center border border-white/10 rounded"
                          >
                            <FiMinus size={12} />
                          </button>

                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="h-7 w-7 flex items-center justify-center border border-white/10 rounded"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-sm font-medium text-white">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* BILL SUMMARY */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 p-5 space-y-4 bg-[#111]">

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Item Total</span>
                      <span>₹{cartTotal}</span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span>₹40</span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span>Taxes</span>
                      <span>₹{Math.floor(cartTotal * 0.05)}</span>
                    </div>

                    <div className="flex justify-between text-white font-semibold border-t border-white/10 pt-2">
                      <span>To Pay</span>
                      <span>
                        ₹{cartTotal + 40 + Math.floor(cartTotal * 0.05)}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      setOrderSuccess(true);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-4 rounded-lg bg-teal-500 text-black font-semibold hover:bg-teal-400 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- CULINARY PROVISIONING SUCCESS OVERLAY --- */}
      <AnimatePresence>
  {orderSuccess && (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center px-4"
      onClick={() => setOrderSuccess(false)}
    >
      {/* MODAL */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 text-center"
      >
        {/* SUCCESS ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center"
        >
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
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold text-gray-900"
        >
          Order Confirmed 🎉
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 mt-2"
        >
          Your order has been successfully placed and is now being prepared.
        </motion.p>

        {/* ETA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 bg-gray-100 rounded-lg py-3"
        >
          <p className="text-xs text-gray-500">Estimated Delivery</p>
          <p className="text-lg font-semibold text-gray-900">
            25–30 mins
          </p>
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 space-y-3"
        >
          <button
            onClick={() => {
              setOrderSuccess(false);
              setCart([]);
            }}
            className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Continue Browsing
          </button>

          <button
            onClick={() => {
              setOrderSuccess(false);
              setCart([]);
              setIsCartOpen(true);
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-black transition"
          >
            View Cart Again
          </button>
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