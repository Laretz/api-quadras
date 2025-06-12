import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface CreateUserUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    role: string;

  }
interface CreateUserUseCaseResponse{
  user: User
}


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.userRepository.create(data);

    return {user};
  }
}
