// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

Object.defineProperty(exports, "__esModule", { value: true });

/**@type {PrismaClient} */
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
