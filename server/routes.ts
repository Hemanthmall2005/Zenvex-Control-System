import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Remove this line completely

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  app.use(express.json());

app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, employeeId, password } = req.body;

    console.log("Employee Received:", req.body);

    return res.json({
      success: true,
      message: "Employee Created Successfully",
      employee: {
        name,
        email,
        employeeId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
app.post("/api/send-telegram", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      serviceId,
      date,
    } = req.body;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const message = `
🔔 NEW BOOKING

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
🏠 Address: ${address}
🛠 Service: ${serviceId}
📅 Date: ${date}
`;

    const response = await fetch(
  `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  }
);

const result = await response.json();

console.log("Telegram Response:", result);

if (!response.ok) {
  throw new Error(JSON.stringify(result));
}

res.json({
  success: true,
  telegram: result,
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
