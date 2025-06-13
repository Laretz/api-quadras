import { PrismaCourtRepository } from "@/domain/court/repositories/prisma/prisma-court-repository";
import { CreateCourtUseCase} from "@/domain/court/use-cases/create-court-use-case";
import { HttpStatusCode } from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const schemaCreateCourt = z.object({
    nome: z.string(),
    tipo: z.string(),
    localizacao: z.string()
})
export async function createCourtController(req: FastifyRequest, res: FastifyReply) {
  try {
    const { nome, tipo, localizacao } = schemaCreateCourt.parse(req.body);
    console.log("Body recebido:", req.body);

    const courtRepository = new PrismaCourtRepository();
    const createCourtUseCase = new CreateCourtUseCase(courtRepository);

    const court = await createCourtUseCase.execute({ nome, tipo, localizacao });

    return res.status(HttpStatusCode.Created).send( court );

  } catch (error) {
    console.error("Erro ao criar quadra:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        message: "Erro de validação",
        issues: error.flatten(),
      });
    }

    console.error("Erro inesperado:", error);
    return res.status(500).send({
      message: "Erro interno no servidor",
      error: error instanceof Error ? error.message : error,
    });
  }
}
