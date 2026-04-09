"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaStar, FaFire, FaCheckCircle, FaChartLine, FaBoxOpen, 
  FaServer, FaDatabase, FaShieldAlt, FaTerminal 
} from "react-icons/fa";
import { FiPlus, FiMinus, FiShoppingBag, FiSettings, FiX, FiCompass, FiActivity, FiLayers } from "react-icons/fi";

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
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, rating: 4.5, type: "veg", time: "25 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop" },
  { id: 4, name: "Butter Chicken", category: "Indian", price: 349, rating: 4.8, type: "non-veg", time: "30 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop" },
  { id: 13, name: "Red Wine", category: "Liquor", price: 499, rating: 4.8, type: "alcohol", time: "5 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9?q=80&w=1170&auto=format&fit=crop" },
  { id: 22, name: "Chocolate Brownie", category: "Desserts", price: 149, rating: 4.8, type: "veg", time: "8 mins", isAvailable: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Pizza", "Indian", "Liquor", "Desserts"];

export default function SaaS_CulinaryOS() {
  const [view, setView] = useState<"user" | "paas">("user");
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // SaaS Simulation: Adding real-time logs
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

  const toggleAvailability = (id: number) => {
    setFoodItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal-500/30">
      
      {/* SaaS Header */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5 px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-teal-500 p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
                <FiActivity className="text-black text-xl" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Culinary<span className="text-teal-500">OS</span></span>
            </Link>

            <div className="hidden md:flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button onClick={() => setView("user")} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${view === "user" ? "bg-white text-black shadow-lg" : "text-gray-500"}`}>Live Storefront</button>
              <button onClick={() => setView("paas")} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${view === "paas" ? "bg-teal-500 text-black shadow-lg" : "text-gray-500"}`}>PaaS Console</button>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right hidden lg:block">
                <p className="text-[9px] font-black text-gray-500 uppercase">Region</p>
                <p className="text-[10px] font-bold text-teal-400 uppercase">aws-south-1 (Mumbai)</p>
             </div>
             <button onClick={() => setIsCartOpen(true)} className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black">
                <FiShoppingBag />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-10">
        {view === "user" ? (
          /* --- B2C USER VIEW --- */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {foodItems.map(item => (
              <div key={item.id} className="group bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-4 hover:border-teal-500/50 transition-all duration-500">
                <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  {!item.isAvailable && <div className="absolute inset-0 bg-black/70 flex items-center justify-center font-black uppercase text-[10px] tracking-widest text-red-500">Node Offline</div>}
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black uppercase text-sm tracking-tight">{item.name}</h3>
                    <span className="text-teal-400 font-black italic">₹{item.price}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    disabled={!item.isAvailable}
                    className="w-full mt-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-20"
                  >
                    Deploy to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- PAAS / SAAS CONSOLE --- */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* KPI Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Request Volume", val: "1.2M", icon: <FiActivity />, color: "text-teal-400" },
                { label: "Uptime Score", val: "99.98%", icon: <FaServer />, color: "text-green-400" },
                { label: "Active Nodes", val: "24/24", icon: <FiLayers />, color: "text-blue-400" },
                { label: "Revenue Flux", val: "₹184K", icon: <FaChartLine />, color: "text-orange-400" },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                  <div className="flex items-center gap-3 text-gray-500 text-[9px] font-black uppercase mb-4">{stat.icon} {stat.label}</div>
                  <div className={`text-3xl font-black italic ${stat.color}`}>{stat.val}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Inventory Control */}
              <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h4 className="font-black uppercase text-xs tracking-[0.2em]">Inventory Instances</h4>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Live Data</span>
                  </div>
                </div>
                <table className="w-full text-left">
                  <tbody className="divide-y divide-white/5">
                    {foodItems.map(item => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden">
                               <img src={item.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <p className="text-[11px] font-black uppercase">{item.name}</p>
                              <p className="text-[9px] text-gray-500 font-bold uppercase">{item.category} • ID: {item.id}00X</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <button 
                            onClick={() => toggleAvailability(item.id)}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase border transition-all ${item.isAvailable ? "border-teal-500/20 text-teal-400" : "border-red-500/20 text-red-500"}`}
                          >
                            {item.isAvailable ? "Operational" : "Offline"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Logs & Security */}
              <div className="space-y-8">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8">
                  <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-2">
                    <FaTerminal className="text-teal-500" /> Runtime Logs
                  </h4>
                  <div className="space-y-4 font-mono">
                    {logs.map(log => (
                      <div key={log.id} className="text-[10px] text-gray-400 border-l-2 border-teal-500/30 pl-3 py-1">
                        <span className="text-teal-500/50">[{new Date(log.id).toLocaleTimeString()}]</span> {log.msg}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-teal-500 rounded-[2.5rem] p-8 text-black">
                   <FaShieldAlt className="mb-4 text-2xl" />
                   <h4 className="font-black uppercase text-lg leading-tight mb-2">Enterprise Security</h4>
                   <p className="text-[10px] font-bold uppercase opacity-70 mb-6">Advanced threat protection is currently active for this instance.</p>
                   <button className="w-full py-3 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Rotate API Keys</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { 
//     FaCheckCircle, 
//     FaDownload, 
//     FaMapMarkerAlt, 
//     FaClock, 
//     FaTerminal 
// } from "react-icons/fa";

// interface SaasSuccessModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     orderData: {
//         id: string;
//         eta: string;
//         amount: number;
//         items: number;
//     };
// }

// // Framer Motion Variants for Orchestration
// const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.4 } },
//     exit: { opacity: 0 }
// };

// const modalVariants = {
//     hidden: { scale: 0.9, opacity: 0, y: 30 },
//     visible: { 
//         scale: 1, 
//         opacity: 1, 
//         y: 0,
//         transition: { 
//             type: "spring", stiffness: 200, damping: 25,
//             staggerChildren: 0.1, delayChildren: 0.1 
//         } 
//     }
// };

// const itemVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: { opacity: 1, x: 0 }
// };

// export default function SaasOrderSuccessModal({ isOpen, onClose, orderData }: SaasSuccessModalProps) {
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     variants={overlayVariants}
//                     initial="hidden" animate="visible" exit="exit"
//                     className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 md:p-6"
//                 >
//                     <motion.div
//                         variants={modalVariants}
//                         className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
//                     >
//                         {/* Top Scanning Line Effect */}
//                         <div className="absolute top-0 left-0 w-full h-[1px] bg-indigo-500 shadow-[0_0_15px_#6366f1] animate-scan" />

//                         <div className="p-8 md:p-12">
//                             {/* Header Section */}
//                             <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
//                                 <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
//                                     <FaCheckCircle className="text-indigo-400 text-3xl" />
//                                 </div>
//                                 <div>
//                                     <h2 className="text-2xl font-black tracking-tighter text-white italic uppercase">Process_Completed</h2>
//                                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Transaction ID: {orderData.id}</p>
//                                 </div>
//                             </motion.div>

//                             {/* Data Grid: SaaS Utility */}
//                             <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
//                                 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
//                                     <div className="flex items-center gap-2 text-indigo-400 mb-1">
//                                         <FaClock className="text-xs" />
//                                         <span className="text-[9px] font-black uppercase">Arrival_ETA</span>
//                                     </div>
//                                     <p className="text-lg font-black text-white">{orderData.eta}</p>
//                                 </div>
//                                 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
//                                     <div className="flex items-center gap-2 text-indigo-400 mb-1">
//                                         <FaTerminal className="text-xs" />
//                                         <span className="text-[9px] font-black uppercase">Units_Processed</span>
//                                     </div>
//                                     <p className="text-lg font-black text-white">{orderData.items} Items</p>
//                                 </div>
//                             </motion.div>

//                             {/* Dynamic Progress Bar */}
//                             <motion.div variants={itemVariants} className="mb-10">
//                                 <div className="flex justify-between text-[9px] font-black uppercase mb-2 tracking-widest text-gray-400">
//                                     <span>Kitchen_Auth</span>
//                                     <span>In_Transit</span>
//                                     <span className="text-indigo-400">Delivered</span>
//                                 </div>
//                                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//                                     <motion.div 
//                                         initial={{ width: "0%" }}
//                                         animate={{ width: "35%" }}
//                                         transition={{ duration: 1.5, ease: "circOut" }}
//                                         className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
//                                     />
//                                 </div>
//                             </motion.div>

//                             {/* Action Matrix */}
//                             <motion.div variants={itemVariants} className="flex flex-col gap-3">
//                                 <div className="flex gap-3">
//                                     <button className="flex-1 bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
//                                         Track Drone
//                                     </button>
//                                     <button className="px-6 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all">
//                                         <FaDownload />
//                                     </button>
//                                 </div>
//                                 <button 
//                                     onClick={onClose}
//                                     className="text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition-colors"
//                                 >
//                                     Dismiss Terminal
//                                 </button>
//                             </motion.div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }