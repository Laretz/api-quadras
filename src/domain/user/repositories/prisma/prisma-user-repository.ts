import { prisma } from "@/lib/prisma";
import { UserParamsFunctionRepository } from "../../types/params/user";
import { UserReturnFunctionRepository } from "../../types/return/user";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(user: UserParamsFunctionRepository["createUser"]): Promise<UserReturnFunctionRepository["getUser"]> {
        const createdUser = await prisma.user.create({
            data: {
                ...user
            }
        })
        return createdUser;
    }

    async update(id: string, data: UserParamsFunctionRepository["updateUser"]): Promise<UserReturnFunctionRepository["getUser"]> {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...data
            }
        });
        return updatedUser;
    }

    async getAllUsers(): Promise<UserReturnFunctionRepository["getUser"][]> {
        const users = await prisma.user.findMany({
            include: { reservas: true }
        });

        return users;
    }
}
