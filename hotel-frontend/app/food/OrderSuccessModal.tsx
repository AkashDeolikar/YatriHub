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