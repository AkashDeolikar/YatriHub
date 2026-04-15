// "use client";

// import Link from "next/link";
// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import RegistryConsole from "../food/admin";
// import {
//   FiPlus,
//   FiMinus,
//   FiShoppingBag,
//   FiCompass
// } from "react-icons/fi";

// /* ---------------- TYPES ---------------- */
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

// /* ---------------- DATA ---------------- */
// const INITIAL_FOOD_DATA: FoodItem[] = [
//   {
//     id: 1,
//     name: "Margherita Pizza",
//     category: "Pizza",
//     price: 299,
//     rating: 4.5,
//     type: "veg",
//     time: "25 mins",
//     isAvailable: true,
//     image:
//       "https://images.unsplash.com/photo-1598023696416-0193a0bcd302"
//   },
//   {
//     id: 2,
//     name: "Chicken Biryani",
//     category: "Indian",
//     price: 379,
//     rating: 4.9,
//     type: "non-veg",
//     time: "35 mins",
//     isAvailable: true,
//     image:
//       "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8"
//   }
// ];

// /* ---------------- MAIN COMPONENT ---------------- */
// export default function CulinaryOS() {
//   const [view, setView] = useState<"user" | "paas">("user");
//   const [foodItems, setFoodItems] = useState(INITIAL_FOOD_DATA);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [search, setSearch] = useState("");

//   /* -------- FILTER -------- */
//   const filteredItems = useMemo(() => {
//     return foodItems.filter(item =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [foodItems, search]);

//   /* -------- AUTO CLEAR CART -------- */
//   useEffect(() => {
//     if (orderSuccess) {
//       const timer = setTimeout(() => {
//         setOrderSuccess(false);
//         setCart([]);
//       }, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [orderSuccess]);

//   /* -------- CART LOGIC -------- */
//   const addToCart = (item: FoodItem) => {
//     if (!item.isAvailable) return;

//     setCart(prev => {
//       const exist = prev.find(i => i.id === item.id);
//       if (exist) {
//         return prev.map(i =>
//           i.id === item.id
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const updateQty = (id: number, delta: number) => {
//     setCart(prev =>
//       prev
//         .map(i =>
//           i.id === id
//             ? { ...i, quantity: i.quantity + delta }
//             : i
//         )
//         .filter(i => i.quantity > 0)
//     );
//   };

//   const cartTotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen bg-[#050505] text-white">

//       {/* HEADER */}
//       <nav className="sticky top-0 bg-[#0f0f0f] border-b border-white/10 p-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <FiCompass className="text-teal-500" />
//           <span className="font-semibold">YatriHub</span>
//         </div>

//         <input
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="Search dishes..."
//           className="bg-white/5 px-3 py-2 rounded text-sm"
//         />

//         <button
//           onClick={() => setIsCartOpen(true)}
//           className="relative"
//         >
//           <FiShoppingBag />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 text-xs bg-white text-black rounded-full px-1">
//               {cart.length}
//             </span>
//           )}
//         </button>
//       </nav>

//       {/* VIEW TOGGLE */}
//       <div className="flex gap-2 p-4">
//         <button onClick={() => setView("user")}>User</button>
//         <button onClick={() => setView("paas")}>Admin</button>
//       </div>

//       {/* GRID / ADMIN */}
//       {view === "paas" ? (
//         <RegistryConsole
//           view={view}
//           foodItems={foodItems}
//           toggleAvailability={(id: number) =>
//             setFoodItems(prev =>
//               prev.map(item =>
//                 item.id === id
//                   ? {
//                       ...item,
//                       isAvailable: !item.isAvailable
//                     }
//                   : item
//               )
//             )
//           }
//           addToCart={addToCart}
//         />
//       ) : (
//         <>
//           {filteredItems.length === 0 ? (
//             <div className="text-center py-20 text-gray-400">
//               No dishes found
//             </div>
//           ) : (
//             <FoodGrid
//               foodItems={filteredItems}
//               addToCart={addToCart}
//             />
//           )}
//         </>
//       )}

//       {/* CART DRAWER */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <motion.div className="fixed right-0 top-0 w-80 h-full bg-black p-4">
//             {cart.map(item => (
//               <div key={item.id} className="flex justify-between mb-3">
//                 <span>{item.name}</span>

//                 <div className="flex items-center gap-2">
//                   <button onClick={() => updateQty(item.id, -1)}>
//                     <FiMinus />
//                   </button>
//                   {item.quantity}
//                   <button onClick={() => updateQty(item.id, 1)}>
//                     <FiPlus />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               onClick={() => {
//                 if (cart.length === 0) return;
//                 setOrderSuccess(true);
//                 setIsCartOpen(false);
//               }}
//               className="mt-4 bg-teal-500 w-full py-2"
//             >
//               Checkout ₹{cartTotal}
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* SUCCESS MODAL */}
//       <AnimatePresence>
//         {orderSuccess && (
//           <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//             <div className="bg-white text-black p-6 rounded-xl text-center">
//               <h2 className="text-lg font-semibold">
//                 Order Placed 🎉
//               </h2>
//               <p className="text-sm mt-2">
//                 Your order has been confirmed and is being prepared.
//               </p>

//               <button
//                 onClick={() => {
//                   setOrderSuccess(false);
//                   setCart([]);
//                 }}
//                 className="mt-4 bg-black text-white px-4 py-2 rounded"
//               >
//                 Continue
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ---------------- GRID ---------------- */
// function FoodGrid({
//   foodItems,
//   addToCart
// }: {
//   foodItems: FoodItem[];
//   addToCart: (item: FoodItem) => void;
// }) {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
//       {foodItems.map(item => (
//         <div key={item.id} className="bg-[#111] p-3 rounded">
//           <img
//             src={item.image}
//             className="h-32 w-full object-cover rounded"
//           />

//           {/* TYPE BADGE */}
//           <div className="flex items-center gap-2 mt-2">
//             <span
//               className={`h-2 w-2 rounded-full ${
//                 item.type === "veg"
//                   ? "bg-green-500"
//                   : item.type === "non-veg"
//                   ? "bg-red-500"
//                   : "bg-yellow-500"
//               }`}
//             />
//             <span className="text-xs text-gray-400">
//               {item.type}
//             </span>
//           </div>

//           <h3 className="text-sm mt-1">{item.name}</h3>

//           <div className="flex justify-between mt-2">
//             <span>₹{item.price}</span>

//             <button
//               onClick={() => addToCart(item)}
//               className="bg-teal-500 px-2 py-1 text-xs"
//             >
//               ADD
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }