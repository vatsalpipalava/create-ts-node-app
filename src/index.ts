import "module-alias/register";

import dotenv from "dotenv";
import os from "os";
import { app } from "@/app";
import connectDB from "@/db";

dotenv.config({ path: "./.env" });

const getLocalIPAddress = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const net of iface) {
        if (net.family === "IPv4" && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return "localhost";
};

const PORT: number = Number(process.env.PORT) || 10100;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      const localIP = getLocalIPAddress();
      console.log(`⚙️ Server is running at port: ${PORT}`);
      console.log(`🌐 Local URL: http://localhost:${PORT}`);
      console.log(`🌐 Network URL: http://${localIP}:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error("MongoDB connection failed !!!", err);
  });
