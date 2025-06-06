import { PrismaUserRepository } from "@/domain/user/repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "@/domain/user/use-cases/create-user-use-case";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository();
  return new CreateUserUseCase(userRepository);
}
