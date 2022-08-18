// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

Object.defineProperty(exports, "__esModule", { value: true });

/**@type {PrismaClient} */
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
module.exports = prisma;
