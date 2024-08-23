import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod"
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {   
          const {data, success} = loginSchema.safeParse(credentials);
          if(!success)
          {
            throw new Error("Invalid credentials");
          }

          //Varificar si usuario existe
          const user = await db.user.findUnique({
            where: {
              email: data.email,
            },
          });

          if(!user || !user.password){
            throw new Error("Invalid credentials");
          }

          //verificar si la contraseña es correcta
          const isValid = await bcrypt.compare(data.password, user.password);

          if(!isValid)
          {
            throw new Error("Invalid credentials");
          }

          return user;
          //   console.log(credentials);
          // // return user object with their profile data
          // if(credentials.email !== "admin@test.com"){
          //   throw new Error("Invalid credentials");
          // }
          // return {
          //   id: "1",
          //   name: "Test User",
          //   email: "admin@test.com"
          // }
        },
      }),
  ],
} satisfies NextAuthConfig