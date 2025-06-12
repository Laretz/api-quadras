import { makeCreateUserUseCase } from "@/domain/user/@factories/make-create-user-use-case";
import { PrismaUserRepository } from "@/domain/user/repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "@/domain/user/use-cases/create-user-use-case";
import { HttpStatusCode } from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const schemaCreateUser = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    telefone: z.string(),
    role: z.string()
})

export async function createUserController(req: FastifyRequest, res: FastifyReply) { 
    
    const { nome, email, senha, telefone, role } = schemaCreateUser.parse(req.body)


    try {

        const createUserUseCase =  makeCreateUserUseCase();
        
        const user = await createUserUseCase.execute({ email, nome, senha, telefone, role });  
        return res.status(HttpStatusCode.Created).send( user );
     } catch (error) {
        console.log("CAIU AQI")
        if(error instanceof Error){
            return res.status(400).send({ message: error.message })
        }
      
        throw error
    }
}