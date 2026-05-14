"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, CheckCircle } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  isHtml?: boolean;
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<"IDLE" | "ASK_SERVICE" | "ASK_TIME" | "ASK_CONFIRM">("IDLE");
  const [bookingData, setBookingData] = useState({ service: "", time: "" });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      text: "👋 Hi! I'm your OSM AI Virtual Assistant. Ask me about pricing, refund guarantees, or type <strong>'book'</strong> to explore!",
      sender: "bot",
      isHtml: true,
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus input field when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText("");
    processInput(text);
  };

  const processInput = (text: string) => {
    // Add user message immediately
    addMessage(text, "user");
    setIsTyping(true);

    // Simulate response latency
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let reply = "";
      let newChatState = chatState;
      let newBookingData = { ...bookingData };

      if (chatState === "IDLE") {
        if (lower.includes("book") || lower.includes("clean") || lower.includes("order") || lower.includes("service")) {
          reply = `I can definitely help you schedule a visit! 📝 <br><br>Which service tier do you require?`;
          newChatState = "ASK_SERVICE";
        } else if (lower.includes("cost") || lower.includes("price") || lower.includes("charge") || lower.includes("rate") || lower.includes("money")) {
          reply = "Our diagnostic inspections start at a flat fixed ₹249, and Deep Cleaning begins at ₹1,299. Type **book** to initiate reserving a timeslot!";
        } else if (lower.includes("refund") || lower.includes("guarantee") || lower.includes("policy")) {
          reply = "We guarantee absolute quality. Persistent issues within 48 hours are subject to a complete rework or full money refund automatically.";
        } else if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
          reply = "Hi there! 👋 I'm your automated assistant. Type **book** to coordinate your professional doorstep service immediately.";
        } else {
          reply = "Great question! You can trigger our seamless flow by tapping the <strong>'Book Clean'</strong> chip or typing **book**!";
        }
      } else if (chatState === "ASK_SERVICE") {
        if (lower.includes("clean")) newBookingData.service = "Deep Home Cleaning";
        else if (lower.includes("salon")) newBookingData.service = "Salon at Home";
        else if (lower.includes("ac") || lower.includes("repair") || lower.includes("appliance")) newBookingData.service = "AC & Appliance Repair";
        else newBookingData.service = text;

        reply = `Selected: <strong>${newBookingData.service}</strong>.<br><br>🗓️ Which time slot works best for you tomorrow?`;
        newChatState = "ASK_TIME";
      } else if (chatState === "ASK_TIME") {
        newBookingData.time = text;
        reply = `Excellent. Let's finalize your order details:<br><br>
        🛍️ Service: <strong>${newBookingData.service}</strong><br>
        📅 Slot: <strong>${text}</strong><br>
        🌍 Region: Bangalore Central Node<br><br>
        Click below or type <strong>CONFIRM</strong> to instantly dispatch!`;
        newChatState = "ASK_CONFIRM";
      } else if (chatState === "ASK_CONFIRM") {
        if (lower.includes("confirm") || lower.includes("yes")) {
          const orderId = "OSMP-" + Math.floor(Math.random() * 90000 + 10000);
          reply = `<div>
            <h5 class="font-bold text-emerald-400 flex items-center gap-1 text-xs mb-1">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ORDER CONFIRMED!
            </h5>
            <p class="text-[11px] text-slate-300 mb-2">Technician successfully scheduled.</p>
            <div class="bg-slate-950/80 rounded-lg p-2.5 text-[10px] space-y-1 border border-white/5 font-mono text-slate-200">
              <div>Ref: <strong>${orderId}</strong></div>
              <div>Job: <strong>${bookingData.service}</strong></div>
              <div>Slot: <strong>${bookingData.time}</strong></div>
            </div>
            <p class="text-[9px] text-emerald-400/80 mt-2">Senior Expert Anil Mishra has accepted. Live tracking opens 15m before arrival!</p>
          </div>`;
        } else {
          reply = "Understood. The booking request has been cleared. How else can I help? Type **'book'** to start anew!";
        }
        newChatState = "IDLE";
        newBookingData = { service: "", time: "" };
      }

      setChatState(newChatState);
      setBookingData(newBookingData);
      addMessage(reply, "bot", true);
    }, 1100);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto select-none">
      {/* Floating WhatsApp Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#22c35e] shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all duration-300 hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-slate-950 ring-transparent focus:ring-[#25D366]/50"
        aria-label="Toggle support chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white animate-in fade-in duration-300" />
        ) : (
          <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.408 0 12.013 0c3.201.001 6.205 1.248 8.46 3.506 2.255 2.258 3.498 5.266 3.497 8.471-.003 6.657-5.351 12.005-11.957 12.005-2.01 0-3.99-.507-5.747-1.474L0 24zm6.613-3.827l.384.228c1.513.899 3.242 1.372 5.013 1.373 5.538 0 10.043-4.505 10.046-10.045.002-2.684-1.04-5.209-2.935-7.105C17.282 2.727 14.762 1.682 12.016 1.681c-5.545 0-10.051 4.506-10.054 10.047a9.97 9.97 0 001.515 5.227l.252.4-.993 3.624 3.709-.973zm12.123-8.269c-.33-.165-1.951-.963-2.252-1.072-.302-.11-.522-.165-.743.165-.22.33-.853 1.073-1.045 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.513-2.653-1.637-.981-.874-1.644-1.953-1.837-2.283-.192-.33-.02-.509.145-.673.149-.148.33-.385.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.082-.165-.742-1.79-.1017-2.45-.269-.648-.548-.56-.743-.57-.192-.01-.413-.012-.633-.012-.22 0-.578.083-.88.413-.303.33-1.157 1.13-1.157 2.752 0 1.621 1.183 3.19 1.348 3.41.165.22 2.328 3.555 5.638 4.982.787.34 1.401.543 1.88.695.792.252 1.513.216 2.083.131.635-.094 1.952-.798 2.227-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385z" />
          </svg>
        )}
      </button>

      {/* Active Chat Window */}
      <div
        className={`absolute bottom-20 left-0 w-[340px] flex flex-col bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left z-50 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#075E54] p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#075E54] font-bold border border-white text-sm">
              AI
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">OSM AI Assistant</h4>
              <div className="flex items-center text-[10px] text-emerald-200 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                Active Support Agent
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-emerald-200/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message Timeline */}
        <div className="flex-1 h-[300px] p-4 space-y-3 overflow-y-auto bg-slate-900 border-b border-white/5 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 text-xs rounded-2xl leading-relaxed select-text ${
                  msg.sender === "user"
                    ? "bg-[#054D44] text-emerald-50 rounded-tr-none"
                    : "bg-slate-800 text-slate-100 rounded-tl-none"
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

          {/* Interactive Chat Buttons depending on chatbot state */}
          {!isTyping && chatState === "ASK_SERVICE" && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              <button
                onClick={() => handleActionClick("Deep Home Cleaning")}
                className="text-[10px] text-indigo-300 border border-indigo-500/30 bg-indigo-950/30 hover:bg-indigo-600 hover:text-white px-2 py-1 rounded-lg transition-all"
              >
                🏠 Cleaning
              </button>
              <button
                onClick={() => handleActionClick("Salon at Home")}
                className="text-[10px] text-pink-300 border border-pink-500/30 bg-pink-950/30 hover:bg-pink-600 hover:text-white px-2 py-1 rounded-lg transition-all"
              >
                💇‍♀️ Salon
              </button>
              <button
                onClick={() => handleActionClick("AC & Repair")}
                className="text-[10px] text-teal-300 border border-teal-500/30 bg-teal-950/30 hover:bg-teal-600 hover:text-white px-2 py-1 rounded-lg transition-all"
              >
                🛠️ Appliance
              </button>
            </div>
          )}

          {!isTyping && chatState === "ASK_TIME" && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              <button
                onClick={() => handleActionClick("9:00 AM (Morning)")}
                className="text-[10px] text-slate-200 border border-white/10 bg-slate-800 hover:bg-indigo-600 px-2.5 py-1 rounded-lg"
              >
                🌅 9 AM
              </button>
              <button
                onClick={() => handleActionClick("2:00 PM (Afternoon)")}
                className="text-[10px] text-slate-200 border border-white/10 bg-slate-800 hover:bg-indigo-600 px-2.5 py-1 rounded-lg"
              >
                ☀️ 2 PM
              </button>
              <button
                onClick={() => handleActionClick("6:00 PM (Evening)")}
                className="text-[10px] text-slate-200 border border-white/10 bg-slate-800 hover:bg-indigo-600 px-2.5 py-1 rounded-lg"
              >
                🌆 6 PM
              </button>
            </div>
          )}

          {!isTyping && chatState === "ASK_CONFIRM" && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleActionClick("CONFIRM")}
                className="flex items-center gap-1 text-[10px] text-white bg-emerald-600 hover:bg-emerald-500 font-bold px-3 py-1.5 rounded-lg shadow"
              >
                <CheckCircle className="h-3 w-3" /> CONFIRM
              </button>
              <button
                onClick={() => handleActionClick("CANCEL")}
                className="text-[10px] text-slate-300 border border-white/10 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center space-x-1 h-8">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Bottom Shortcuts Context Chips (Only in idle) */}
        {chatState === "IDLE" && (
          <div className="p-2 border-t border-white/5 bg-slate-950 flex flex-wrap gap-1.5">
            <button
              onClick={() => handleActionClick("What are deep cleaning rates?")}
              className="text-[9px] text-slate-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full transition-colors"
            >
              💰 Check Rates
            </button>
            <button
              onClick={() => handleActionClick("Start Booking")}
              className="text-[9px] text-slate-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full transition-colors"
            >
              📝 Book Visit
            </button>
            <button
              onClick={() => handleActionClick("What is your refund policy?")}
              className="text-[9px] text-slate-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full transition-colors"
            >
              🛡️ Refund Coverage
            </button>
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleFormSubmit} className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type to book or ask questions..."
            className="flex-1 min-w-0 bg-white/5 border border-white/10 focus:border-[#25D366] text-white px-4 py-2 rounded-full text-xs outline-none focus:ring-1 focus:ring-[#25D366]/40 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex-shrink-0 h-8 w-8 rounded-full bg-[#075E54] hover:bg-emerald-600 disabled:bg-slate-800 text-white disabled:text-slate-600 flex items-center justify-center shadow-lg transition-all outline-none focus:ring-2 focus:ring-emerald-600/50"
          >
            <Send className="h-3.5 w-3.5 transform rotate-45 -translate-x-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
