import { prisma } from "../prisma";

export async function createUserService(data: {
    name: string, 
    email: string, 
    password: string
}){
    return prisma.user.create({
        data
    });
}

export async function getAllUsersService() {
    return prisma.user.findMany();
}

export async function getUserByIdService(id: string) {
    return prisma.user.findUnique({
        where: { id }
    })
}

export async function updateUserService(id: string, data: {
    name?: string, 
    email?: string, 
    password?: string
}){
    return prisma.user.update({
        where: { id },
        data
    });
}

export async function deleteUserService(id: string) {
    return prisma.user.delete({
        where: { id }
    })
}


