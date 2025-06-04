import { Prisma } from "../../../../generated/prisma" 

export interface UserParamsFunctionRepository{
    createUser: Prisma.UserCreateInput,
    updateUser: Prisma.UserUncheckedUpdateInput,
    findByEmail: string
}