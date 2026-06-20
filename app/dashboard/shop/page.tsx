"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Coins,
  Sparkles,
  Check,
  ShoppingBag,
  Info,
} from "lucide-react";
import Link from "next/link";
import AvatarKid from "@/components/ui/AvatarKid";
import StudentHeader from "@/components/layout/StudentHeader";

interface StoreItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
  category: "hat" | "glasses" | "accessory";
}

export default function StudentShopPage() {
  const [coins, setCoins] = useState(120);
  const [selectedCharacter, setSelectedCharacter] = useState<"star" | "crescent" | "sheep" | "sun">("star");
  const [ownedItemIds, setOwnedItemIds] = useState<string[]>(["item_default"]);
  const [equippedItems, setEquippedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const storeItems: StoreItem[] = [
    { id: "hat_crown", name: "Mahkota Emas", emoji: "👑", price: 50, description: "Menjadi raja & ratu mengaji", category: "hat" },
    { id: "glasses_cool", name: "Kacamata Hitam", emoji: "🕶️", price: 30, description: "Gaya keren saat tatap muka", category: "glasses" },
    { id: "hat_wizard", name: "Topi Penyihir", emoji: "🧙", price: 40, description: "Topi ajaib pelindung makhraj", category: "hat" },
    { id: "accessory_mask", name: "Topeng Hero", emoji: "🎭", price: 25, description: "Menjaga kejujuran dan keberanian", category: "accessory" },
    { id: "accessory_wings", name: "Sayap Malaikat", emoji: "🪽", price: 60, description: "Terbang tinggi raih cita-cita", category: "accessory" },
    { id: "glasses_cute", name: "Kacamata Bulat", emoji: "👓", price: 20, description: "Fokus belajar membaca tajwid", category: "glasses" },
  ];

  const triggerToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyItem = (item: StoreItem) => {
    if (ownedItemIds.includes(item.id)) return;

    if (coins >= item.price) {
      setCoins(coins - item.price);
      setOwnedItemIds([...ownedItemIds, item.id]);
      setEquippedItems([...equippedItems, item.id]);
      triggerToast(`Kamu berhasil membeli ${item.name}! 🎉`, "success");
    } else {
      triggerToast("Koin emas kamu tidak cukup! Ayo mengaji lagi untuk dapat koin! 🪙", "error");
    }
  };

  const toggleEquip = (itemId: string) => {
    if (!ownedItemIds.includes(itemId)) return;

    if (equippedItems.includes(itemId)) {
      setEquippedItems(equippedItems.filter((id) => id !== itemId));
      triggerToast("Aksesoris dilepas!");
    } else {
      // Find category of newly equipped item to replace other items of same category
      const itemToEquip = storeItems.find((i) => i.id === itemId);
      if (!itemToEquip) return;

      // Filter out items of the same category
      const filteredEquipped = equippedItems.filter((equippedId) => {
        const eqItem = storeItems.find((i) => i.id === equippedId);
        return eqItem ? eqItem.category !== itemToEquip.category : true;
      });

      setEquippedItems([...filteredEquipped, itemId]);
      triggerToast(`${itemToEquip.name} dipakai! ✨`);
    }
  };

  // Get current active equipped emojis
  const activeHat = storeItems.find((i) => equippedItems.includes(i.id) && i.category === "hat");
  const activeGlasses = storeItems.find((i) => equippedItems.includes(i.id) && i.category === "glasses");
  const activeAccessory = storeItems.find((i) => equippedItems.includes(i.id) && i.category === "accessory");

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito relative select-none text-gray-800">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-2 border-2 ${
              toastType === "success"
                ? "bg-emerald-500 text-white border-emerald-600"
                : "bg-red-500 text-white border-red-600"
            }`}
          >
            {toastType === "success" ? "🎉" : "⚠️"}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <StudentHeader coins={coins} />

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: AVATAR PREVIEW CUSTOMIZATION */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-primary to-secondary" />
            
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-6">Preview Avatar</h3>
            
            {/* Interactive Avatar Render with overlay items */}
            <div className="relative w-44 h-44 bg-gradient-to-b from-amber-50 to-orange-50 rounded-full border-4 border-secondary/10 flex items-center justify-center mb-6">
              
              {/* Accessory Layer (e.g. Wings in background) */}
              {activeAccessory && activeAccessory.emoji === "🪽" && (
                <motion.span
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute text-7xl select-none pointer-events-none z-0"
                  style={{ top: "15%", left: "10%" }}
                >
                  🪽
                </motion.span>
              )}

              {/* Base Avatar */}
              <div className="relative z-10">
                <AvatarKid character={selectedCharacter} size={110} animated />
              </div>

              {/* Hat Layer Overlay */}
              {activeHat && (
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute text-5xl select-none pointer-events-none z-20"
                  style={{
                    top: selectedCharacter === "sheep" ? "-15px" : "-22px",
                    left: selectedCharacter === "crescent" ? "20%" : "34%",
                    transform: selectedCharacter === "crescent" ? "rotate(-10deg)" : "none"
                  }}
                >
                  {activeHat.emoji}
                </motion.span>
              )}

              {/* Glasses Layer Overlay */}
              {activeGlasses && (
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute text-4xl select-none pointer-events-none z-20"
                  style={{
                    top: "38%",
                    left: selectedCharacter === "crescent" ? "24%" : "37%",
                  }}
                >
                  {activeGlasses.emoji}
                </motion.span>
              )}

              {/* Mask/Accessory Overlay (Face Front) */}
              {activeAccessory && activeAccessory.emoji === "🎭" && (
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute text-4xl select-none pointer-events-none z-20"
                  style={{
                    top: "40%",
                    left: selectedCharacter === "crescent" ? "25%" : "39%",
                  }}
                >
                  🎭
                </motion.span>
              )}

            </div>

            {/* Change character selector quick-toggles */}
            <div className="flex justify-center gap-2 w-full border-t border-gray-100 pt-5">
              {(["star", "crescent", "sheep", "sun"] as const).map((char) => (
                <button
                  key={char}
                  onClick={() => setSelectedCharacter(char)}
                  className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                    selectedCharacter === char
                      ? "border-primary bg-primary-light/30 scale-105"
                      : "border-neutral-border hover:border-gray-300 bg-white"
                  }`}
                >
                  <AvatarKid character={char} size={24} animated={false} />
                </button>
              ))}
            </div>

            <p className="text-[10px] font-bold text-gray-400 mt-3 leading-relaxed">
              Kamu bisa mengubah karakter di atas untuk mencocokkan aksesoris yang sedang kamu pakai!
            </p>
          </div>

          {/* INFO CARD */}
          <div className="bg-white border-3 border-neutral-border rounded-[24px] p-5 shadow-sm flex gap-3 items-start">
            <Info className="text-secondary flex-shrink-0 mt-0.5" size={18} />
            <div className="text-left">
              <h4 className="text-xs font-black text-gray-800">Bagaimana cara dapat koin?</h4>
              <p className="text-[10px] font-semibold text-gray-400 mt-1 leading-relaxed">
                Setiap kali kamu menyelesaikan bacaan baru atau latihan makhraj bersama ustadz, kamu akan mendapatkan koin emas bonus! Ayo kumpulkan lebih banyak koin.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STORE ITEMS CATALOG */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-secondary" />
              Katalog Aksesoris Keren
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {storeItems.map((item) => {
                const isOwned = ownedItemIds.includes(item.id);
                const isEquipped = equippedItems.includes(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={`border-3 rounded-2xl p-4 flex items-center justify-between transition-all ${
                      isEquipped
                        ? "border-primary bg-primary-light/10"
                        : isOwned
                        ? "border-neutral-border bg-white"
                        : "border-neutral-border hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-warm border-2 border-neutral-border flex items-center justify-center text-3xl shadow-inner select-none">
                        {item.emoji}
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                          {item.name}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">{item.description}</p>
                        
                        {!isOwned && (
                          <div className="flex items-center gap-1 mt-1 text-secondary-dark font-black text-xs">
                            <Coins size={12} className="fill-secondary text-secondary-dark" />
                            <span>{item.price} koin</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isOwned ? (
                        <button
                          type="button"
                          onClick={() => toggleEquip(item.id)}
                          className={`font-black text-xs py-2 px-3 rounded-xl border-b-2 transition-all active:border-b-0 active:translate-y-[1px] ${
                            isEquipped
                              ? "bg-primary text-white border-primary-dark hover:bg-primary-dark"
                              : "bg-gray-150 hover:bg-gray-200 text-gray-600 border-gray-300"
                          }`}
                        >
                          {isEquipped ? "Dipakai ✅" : "Pakai 👚"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleBuyItem(item)}
                          className="bg-secondary hover:bg-secondary-dark text-white font-black text-xs py-2 px-3.5 rounded-xl border-b-2 border-secondary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center gap-1"
                        >
                          <ShoppingBag size={12} />
                          Beli
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
