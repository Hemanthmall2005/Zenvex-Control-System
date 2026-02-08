import { useState, useEffect } from "react";

// Mock Data Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

// Mock Data
const SERVICES: Service[] = [
  {
    id: "1",
    title: "Termite Control",
    description: "Complete termite eradication and prevention systems for long-term protection.",
    icon: "bug",
    price: 199
  },
  {
    id: "2",
    title: "Rodent Control",
    description: "Safe and effective removal of rats and mice with exclusion services.",
    icon: "rat",
    price: 149
  },
  {
    id: "3",
    title: "Cockroach Treatment",
    description: "Intensive gel baiting and spraying to eliminate cockroach infestations.",
    icon: "spray",
    price: 99
  },
  {
    id: "4",
    title: "Bed Bug Heat Treatment",
    description: "Chemical-free heat treatment to kill bed bugs at all life stages.",
    icon: "bed",
    price: 299
  },
  {
    id: "5",
    title: "Mosquito Fogging",
    description: "Seasonal mosquito control for yards and outdoor spaces.",
    icon: "cloud",
    price: 89
  },
  {
    id: "6",
    title: "Commercial Disinfection",
    description: "Hospital-grade disinfection services for offices and workspaces.",
    icon: "shield",
    price: 249
  }
];

const INDUSTRIES: Industry[] = [
  {
    id: "1",
    title: "Residential",
    description: "Protecting families and homes from unwanted pests with child-safe methods.",
    image: "/assets/images/hero-pest-control.png"
  },
  {
    id: "2",
    title: "Commercial Offices",
    description: "Discrete and effective pest control for professional environments.",
    image: "/assets/images/industry-warehouse.jpg"
  },
  {
    id: "3",
    title: "Warehousing",
    description: "Large-scale pest management for storage and logistics facilities.",
    image: "/assets/images/industry-warehouse.jpg"
  },
  {
    id: "4",
    title: "Food Service",
    description: "HACCP compliant pest control for restaurants and food processing.",
    image: "/assets/images/service-termite.jpg"
  }
];

const KNOWLEDGE_BASE: Article[] = [
  {
    id: "1",
    title: "Signs of Termite Infestation",
    excerpt: "Learn how to spot early warning signs of termites before they cause major damage.",
    content: "Full content here...",
    date: "2023-10-15",
    author: "Dr. Entomology"
  },
  {
    id: "2",
    title: "Preparing for a Pest Control Visit",
    excerpt: "What you need to do before our technicians arrive for the most effective treatment.",
    content: "Full content here...",
    date: "2023-11-02",
    author: "Service Team"
  },
  {
    id: "3",
    title: "Eco-Friendly Pest Solutions",
    excerpt: "How we use green products to keep your home safe while eliminating pests.",
    content: "Full content here...",
    date: "2023-12-10",
    author: "Green Tech"
  }
];

// Mock API Functions
export const api = {
  getServices: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return SERVICES;
  },
  
  getIndustries: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return INDUSTRIES;
  },
  
  getArticles: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return KNOWLEDGE_BASE;
  },
  
  submitBooking: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Booking Submitted:", data);
    return { success: true, message: "Booking received successfully!" };
  },
  
  submitContact: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Message Submitted:", data);
    return { success: true, message: "Message sent successfully!" };
  },
  
  submitAttendance: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Attendance Recorded:", data);
    return { success: true, message: "Attendance marked successfully!" };
  },
  
  login: async (credentials: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (credentials.email === "admin@zenvex.com" && credentials.password === "admin") {
      return { success: true, token: "mock-jwt-token", user: { name: "Admin User", role: "admin" } };
    }
    throw new Error("Invalid credentials");
  }
};
