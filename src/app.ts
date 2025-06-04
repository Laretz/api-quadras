import fastify from "fastify";

import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";

export const app = fastify({
    logger: true
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)



// app.register(async (i) => {
//     await connectMongo(i)
// });




app.register(appRoutes)

app.setErrorHandler((error, _, reply)=>{
    if(hasZodFastifySchemaValidationErrors(error)){

        const errorMessages: string[] = error.validation.map((value) => {
            return value.message
        })

        console.log(error)
 
        return reply
            .status(400)
            .send({ message: "Validation Schema Errorr." , issues: errorMessages })
    }

    if(error instanceof ZodError){
        
        return reply
            .status(400)
            .send({ message: "Validation Schema Error" , issues: error.flatten().fieldErrors })
    }

 

    return reply.status(500).send({ message: 'Internal server error.' })
})