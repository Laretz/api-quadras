import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { UserRepository } from "../repositories/user-repository";
import { UserParamsFunctionRepository } from "../types/params/user";
import { UserReturnFunctionRepository } from "../types/return/user";

export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository
    ){}
  async execute(data: UserParamsFunctionRepository["createUser"]): Promise<UserReturnFunctionRepository["getUser"]> {

    const user = await this.userRepository.create({
        ...data,  
    })

     return user 
  }
}