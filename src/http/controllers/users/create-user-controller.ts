import { PrismaUserRepository } from "@/domain/user/repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "@/domain/user/use-cases/create-user-use-case";
import { HttpStatusCode } from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const schemaCreate = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    telefone: z.string(),
    role: z.string()
})

export async function createUserController(req: FastifyRequest, res: FastifyReply) { 
    
    const { nome, email, senha, telefone, role } = schemaCreate.parse(req.body)

    console.log(nome, email)
    try {
        const userRepository = new PrismaUserRepository();
        const createUserUseCase = new CreateUserUseCase(userRepository);
        
        const user = await createUserUseCase.execute({ email, nome, senha, telefone, role });  
     
        return res.status(HttpStatusCode.Created).send({ user });
    }catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(HttpStatusCode.InternalServerError).send({ message: "Erro ao criar usuário", error: (error as Error).message });
}


}