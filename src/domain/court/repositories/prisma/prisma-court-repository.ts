import { prisma } from "@/lib/prisma";
import { CourtParamsFunctionRepository } from "../../types/params/court";
import { CourtReturnFunctionRepository } from "../../types/return/court";
import { CourtRepository } from "../court-repository";


export class PrismaCourtRepository implements CourtRepository{
    async create(court: CourtParamsFunctionRepository["createCourt"]): Promise<CourtReturnFunctionRepository["getCourt"]> {
        const createdCourt = await prisma.court.create({
            data: {
                ...court
            }
        })
        return createdCourt
    }
    async update(id: string, data: CourtParamsFunctionRepository["updateCourt"]): Promise<CourtReturnFunctionRepository["getCourt"]> {
        const updatedCourt = await prisma.court.update({
            where: { id },
            data: {
                ...data
            }


        })
        return updatedCourt
    }


}