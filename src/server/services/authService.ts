import argon2 from "argon2";
import { userRepository } from "../repositories/userRepository";

export const authService = {
  async register(input: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const exists = await userRepository.findByEmail(input.email);
    if (exists) throw new Error("EMAIL_TAKEN");
    const passwordHash = await argon2.hash(input.password);
    const user = await userRepository.create({
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    });
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  },

  async verifyCredentials(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) return null;
    return {
      id: user.id,
      email: user.email,
      name:
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
    };
  },
};
