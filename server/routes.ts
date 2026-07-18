import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
