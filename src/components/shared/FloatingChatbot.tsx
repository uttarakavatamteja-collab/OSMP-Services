"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, CheckCircle, RefreshCw, CreditCard, Calendar, Clock, User } from "lucide-react";
import { allServices } from "@/data/services";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  isHtml?: boolean;
};

type ChatState = "IDLE" | "ASK_CATEGORY" | "ASK_SERVICE" | "ASK_TIME" | "ASK_CONFIRM";

type BookingData = {
  category: string;
  service: string;
  price: string;
  time: string;
};

const CATEGORY_EMOJIS: Record<string, string> = {
  "Cleaning": "🧹",
  "Salon": "💇‍♀️",
  "Repairs": "🛠️",
  "Moving": "📦",
  "Laptops": "💻",
  "Mobiles": "📱"
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>("IDLE");
  const [bookingData, setBookingData] = useState<BookingData>({ category: "", service: "", price: "", time: "" });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      text: "👋 Hi! I'm your OSM AI Virtual Assistant. Ask me about our 100% guarantee, prices, or type <strong>'book'</strong> to get started!",
      sender: "bot",
      isHtml: true,
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus input field when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Extracted categories dynamically from our actual service database
  const uniqueCategories = Array.from(new Set(allServices.map((s) => s.category)));

  // Get services matching selected category
  const filteredServices = allServices.filter(
    (s) => s.category.toLowerCase() === bookingData.category.toLowerCase()
  );

  const addMessage = (text: string, sender: "user" | "bot", isHtml = false) => {
    const newMsg: Message = {
      id: `${sender}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender,
      isHtml,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleActionClick = (selectionText: string) => {
    processInput(selectionText);
  };

  const handleReset = () => {
    setChatState("IDLE");
    setBookingData({ category: "", service: "", price: "", time: "" });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        text: "🔄 Chat session reset. How can I help you today? Ask a question or type **'book'** to view our categories!",
        sender: "bot",
        isHtml: true,
      },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText("");
    processInput(text);
  };

  const processInput = (text: string) => {
    addMessage(text, "user");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let reply = "";
      let newChatState = chatState;
      let newBookingData = { ...bookingData };

      if (chatState === "IDLE") {
        if (lower.includes("book") || lower.includes("order") || lower.includes("service") || lower.includes("hire")) {
          reply = `Awesome! I can securely lock in a booking right here. 📑<br><br>Which service category are you looking for? Please tap one of our verified departments:`;
          newChatState = "ASK_CATEGORY";
        } else if (lower.includes("cost") || lower.includes("price") || lower.includes("charge") || lower.includes("rate") || lower.includes("money")) {
          reply = "Our rates are 100% fixed and transparent! 💰 Basic diagnostics start at ₹249. Full Home Deep Cleaning starts at ₹1,999. Type **book** to explore all active rates dynamically.";
        } else if (lower.includes("refund") || lower.includes("guarantee") || lower.includes("policy") || lower.includes("bad") || lower.includes("cancel")) {
          reply = "🛡️ We back all sessions with a <strong>100% Quality Assurance</strong> guarantee. If our work fails metrics, we dispatch a free redo within 48 hours or initialize a full money refund back to your bank.";
        } else if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("sup")) {
          reply = "Hi there! 👋 I'm the OSM conversational agent, here to reclaim your time! Would you like to <strong>'book'</strong> a home expert right now?";
        } else {
          reply = "That is an excellent question! As an advanced service assistant, I am fully capable of reserving your slots. Type **book** to browse all our categories live!";
        }
      } else if (chatState === "ASK_CATEGORY") {
        // Resolve the category name (case-insensitive from unique list)
        const matchedCategory = uniqueCategories.find(
          (c) => c.toLowerCase() === lower || lower.includes(c.toLowerCase())
        ) || text;

        newBookingData.category = matchedCategory;
        const emojis = CATEGORY_EMOJIS[matchedCategory] || "👉";
        
        reply = `Terrific! Selected ${emojis} <strong>${matchedCategory}</strong> department.<br><br>Which specific service would you like to reserve?`;
        newChatState = "ASK_SERVICE";
      } else if (chatState === "ASK_SERVICE") {
        // Locate actual service row to fetch official prices
        const matchedRow = allServices.find(
          (s) => s.title.toLowerCase() === lower || lower.includes(s.title.toLowerCase()) || text.includes(s.title)
        );

        if (matchedRow) {
          newBookingData.service = matchedRow.title;
          newBookingData.price = matchedRow.price;
        } else {
          newBookingData.service = text;
          newBookingData.price = "499 (Estimate)";
        }

        reply = `Got it! 📦 Selected <strong>${newBookingData.service}</strong>.<br>Cost: <strong>₹${newBookingData.price}</strong>.<br><br>🗓️ Select your preferred dispatch slot tomorrow:`;
        newChatState = "ASK_TIME";
      } else if (chatState === "ASK_TIME") {
        newBookingData.time = text;
        
        reply = `<div class="space-y-2">
          <div class="font-semibold text-indigo-200">🧾 Digital Order Preview</div>
          <div class="space-y-1 border-l border-emerald-500 pl-2.5 my-2 text-[11px]">
            <div class="text-slate-300">Category: <span class="text-white font-medium">${newBookingData.category}</span></div>
            <div class="text-slate-300">Service: <span class="text-white font-medium">${newBookingData.service}</span></div>
            <div class="text-slate-300">Slot: <span class="text-white font-medium">${text}</span></div>
            <div class="text-emerald-400 font-semibold">Estimate: ₹${newBookingData.price}</div>
          </div>
          <div>Type <strong>CONFIRM</strong> or tap the checkmark below to dispatch!</div>
        </div>`;
        newChatState = "ASK_CONFIRM";
      } else if (chatState === "ASK_CONFIRM") {
        if (lower.includes("confirm") || lower.includes("yes") || lower.includes("ok")) {
          const orderId = "OSMP-" + Math.floor(Math.random() * 90000 + 10000);
          reply = `<div class="bg-emerald-950/70 border border-emerald-500/40 p-4 rounded-2xl text-emerald-50 shadow-2xl">
            <div class="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2.5">
              <div class="flex h-2 w-2 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></div>
              SUCCESS! ORDER SECURED
            </div>
            
            <p class="text-[10px] text-slate-200 leading-tight mb-3">Your dispatch order is processed and scheduled in our local system node.</p>
            
            <div class="bg-black/40 rounded-xl p-3 text-[10px] border border-white/10 space-y-1.5 font-mono">
              <div class="flex justify-between"><span>Reference:</span> <strong class="text-white">${orderId}</strong></div>
              <div class="flex justify-between"><span>Product:</span> <strong class="text-slate-200 max-w-[120px] truncate text-right">${bookingData.service}</strong></div>
              <div class="flex justify-between"><span>Arrival Slot:</span> <strong class="text-slate-200">${bookingData.time}</strong></div>
              <div class="flex justify-between text-emerald-300 font-bold border-t border-white/10 pt-1 mt-1"><span>Total Cost:</span> <span>₹${bookingData.price}</span></div>
            </div>
            
            <div class="mt-3 text-[9px] text-emerald-200/80 leading-relaxed flex gap-1.5">
              <span>🧑‍🔧</span>
              <span>Vetted Expert <strong>Anil Mishra</strong> assigned. Real-time Leaflet GPS tracking begins 15 minutes before slot arrival!</span>
            </div>
          </div>`;
        } else {
          reply = "Draft cancelled. No bookings were created. Let me know if you need assistance with anything else!";
        }
        newChatState = "IDLE";
        newBookingData = { category: "", service: "", price: "", time: "" };
      }

      setChatState(newChatState);
      setBookingData(newBookingData);
      addMessage(reply, "bot", true);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto select-none">
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#22c35e] shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-300 hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-slate-950 ring-transparent focus:ring-[#25D366]/50"
        aria-label="Support and Conversational Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white animate-in fade-in duration-300" />
        ) : (
          <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.408 0 12.013 0c3.201.001 6.205 1.248 8.46 3.506 2.255 2.258 3.498 5.266 3.497 8.471-.003 6.657-5.351 12.005-11.957 12.005-2.01 0-3.99-.507-5.747-1.474L0 24zm6.613-3.827l.384.228c1.513.899 3.242 1.372 5.013 1.373 5.538 0 10.043-4.505 10.046-10.045.002-2.684-1.04-5.209-2.935-7.105C17.282 2.727 14.762 1.682 12.016 1.681c-5.545 0-10.051 4.506-10.054 10.047a9.97 9.97 0 001.515 5.227l.252.4-.993 3.624 3.709-.973zm12.123-8.269c-.33-.165-1.951-.963-2.252-1.072-.302-.11-.522-.165-.743.165-.22.33-.853 1.073-1.045 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.513-2.653-1.637-.981-.874-1.644-1.953-1.837-2.283-.192-.33-.02-.509.145-.673.149-.148.33-.385.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.082-.165-.742-1.79-.1017-2.45-.269-.648-.548-.56-.743-.57-.192-.01-.413-.012-.633-.012-.22 0-.578.083-.88.413-.303.33-1.157 1.13-1.157 2.752 0 1.621 1.183 3.19 1.348 3.41.165.22 2.328 3.555 5.638 4.982.787.34 1.401.543 1.88.695.792.252 1.513.216 2.083.131.635-.094 1.952-.798 2.227-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385z" />
          </svg>
        )}
      </button>

      {/* Chat Window Drawer */}
      <div
        className={`absolute bottom-20 left-0 w-[350px] flex flex-col bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left z-50 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Top Header */}
        <div className="bg-[#075E54] p-4 flex items-center justify-between text-white border-b border-black/10">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#075E54] font-bold border-2 border-white shadow text-sm relative">
              AI
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border border-white"></div>
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight leading-none mb-1">OSM AI Assistant</h4>
              <div className="flex items-center text-[10px] text-emerald-100 gap-1">
                <span>● Online</span>
                <span className="opacity-50">|</span>
                <span>Replies instantly</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Reset Chat"
              className="p-1.5 text-emerald-100 hover:bg-black/10 rounded-full transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-emerald-100 hover:bg-black/10 rounded-full transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages History Canvas */}
        <div className="flex-1 h-[320px] p-4 space-y-3 overflow-y-auto bg-[#0b141a] border-b border-white/5 custom-scrollbar relative">
          {/* Subtle WhatsApp-like subtle pattern backdrop */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex relative z-10 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 text-xs rounded-xl leading-relaxed select-text shadow-md ${
                  msg.sender === "user"
                    ? "bg-[#054D44] text-emerald-50 rounded-tr-none"
                    : "bg-[#202c33] text-slate-100 rounded-tl-none border border-white/5"
                }`}
              >
                {msg.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Interactive Selection Action Trees inside timeline */}
          
          {/* STEP 1: CHOOSE CATEGORY */}
          {!isTyping && chatState === "ASK_CATEGORY" && (
            <div className="flex flex-wrap gap-2 mt-1 relative z-10">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleActionClick(cat)}
                  className="text-[10px] text-indigo-100 border border-indigo-500/20 bg-indigo-900/30 hover:bg-indigo-600 hover:border-indigo-400 px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <span>{CATEGORY_EMOJIS[cat] || "👉"}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2: CHOOSE SUB-SERVICE (FILTETED) */}
          {!isTyping && chatState === "ASK_SERVICE" && (
            <div className="grid grid-cols-1 gap-2 mt-1 relative z-10">
              {filteredServices.map((serv) => (
                <button
                  key={serv.id}
                  onClick={() => handleActionClick(serv.title)}
                  className="text-left text-[10px] border border-white/5 bg-[#202c33]/80 hover:bg-indigo-900/50 hover:border-indigo-500/30 p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-between group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-100 truncate group-hover:text-white">{serv.title}</div>
                    <div className="text-[9px] text-slate-400 flex items-center gap-1">
                      <span>⏱️ {serv.duration}</span>
                      <span>•</span>
                      <span>⭐ {serv.rating}</span>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold text-xs pl-2">₹{serv.price}</div>
                </button>
              ))}
              {filteredServices.length === 0 && (
                <div className="text-[10px] text-slate-400 italic">No nested services defined. Type raw request.</div>
              )}
            </div>
          )}

          {/* STEP 3: CHOOSE TIMESLOT */}
          {!isTyping && chatState === "ASK_TIME" && (
            <div className="flex flex-wrap gap-2 mt-1 relative z-10">
              <button
                onClick={() => handleActionClick("9:00 AM (Morning)")}
                className="text-[10px] text-slate-100 border border-white/10 bg-[#202c33] hover:bg-indigo-900 hover:border-indigo-500/50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Clock className="h-3 w-3 text-indigo-300" /> 🌅 Morning (9 AM)
              </button>
              <button
                onClick={() => handleActionClick("2:00 PM (Afternoon)")}
                className="text-[10px] text-slate-100 border border-white/10 bg-[#202c33] hover:bg-indigo-900 hover:border-indigo-500/50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Clock className="h-3 w-3 text-orange-300" /> ☀️ Afternoon (2 PM)
              </button>
              <button
                onClick={() => handleActionClick("6:00 PM (Evening)")}
                className="text-[10px] text-slate-100 border border-white/10 bg-[#202c33] hover:bg-indigo-900 hover:border-indigo-500/50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Clock className="h-3 w-3 text-purple-300" /> 🌆 Evening (6 PM)
              </button>
            </div>
          )}

          {/* STEP 4: FINAL CONFIRMATION */}
          {!isTyping && chatState === "ASK_CONFIRM" && (
            <div className="flex gap-2 mt-2 relative z-10">
              <button
                onClick={() => handleActionClick("CONFIRM")}
                className="flex items-center gap-1.5 text-[10px] text-white bg-emerald-600 hover:bg-emerald-500 font-bold px-4 py-2 rounded-xl shadow-md active:scale-95 transition-all"
              >
                <CheckCircle className="h-3.5 w-3.5" /> CONFIRM DISPATCH
              </button>
              <button
                onClick={() => handleActionClick("CANCEL")}
                className="text-[10px] text-slate-200 border border-white/10 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl shadow-sm"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Typing bubble */}
          {isTyping && (
            <div className="flex justify-start relative z-10">
              <div className="bg-[#202c33] border border-white/5 px-3.5 py-2.5 rounded-xl rounded-tl-none flex items-center space-x-1 h-8 shadow-md">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Help Shortcut Context Chips (Shown during IDLE) */}
        {chatState === "IDLE" && (
          <div className="p-2.5 border-t border-white/5 bg-[#111b21] flex flex-wrap gap-2">
            <button
              onClick={() => handleActionClick("Start Booking Process")}
              className="text-[9px] text-emerald-300 hover:text-emerald-100 border border-emerald-500/20 bg-emerald-950/30 hover:bg-emerald-900/40 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
            >
              <span>⚡</span> <span>Instant Booking</span>
            </button>
            <button
              onClick={() => handleActionClick("What is your 48-hour guarantee?")}
              className="text-[9px] text-slate-300 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full transition-colors"
            >
              🛡️ Money-Back Guarantee
            </button>
            <button
              onClick={() => handleActionClick("How much is deep cleaning?")}
              className="text-[9px] text-slate-300 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full transition-colors"
            >
              💰 View Base Rates
            </button>
          </div>
        )}

        {/* Chat Text Input form */}
        <form onSubmit={handleFormSubmit} className="p-3.5 bg-[#111b21] border-t border-white/5 flex items-center gap-2">
          <div className="flex-1 relative bg-[#202c33] rounded-full border border-white/10 focus-within:border-[#00a884] transition-all flex items-center px-3">
            <input
              type="text"
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask rates or type 'book'..."
              className="flex-1 min-w-0 bg-transparent text-white py-2 text-xs outline-none select-text placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex-shrink-0 h-9 w-9 rounded-full bg-[#00a884] hover:bg-[#008f72] disabled:bg-slate-800 text-white disabled:text-slate-600 flex items-center justify-center shadow-md active:scale-95 transition-all outline-none"
          >
            <Send className="h-4 w-4 transform rotate-45 -translate-x-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
