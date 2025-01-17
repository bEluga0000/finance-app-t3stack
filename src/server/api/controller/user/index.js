import { z } from "zod";
import bcrypt from "bcryptjs";

import {
    publicProcedure,
} from "~/server/api/trpc";


export const login = publicProcedure
    .input(
        z.object({
            email: z.string(),
            password: z.string(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        // Find user in the database by username
        const user = await ctx.db.query.userMasterInFinanceProject.findFirst({
            where: (fields, operators) =>
                operators.eq(fields.email, input.email),
        });
        // console.log(user)
        if (!user) {
            return { message: "Invalid username ", user, success: false };
        }
        // Compare the hashed password with the input password
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            return { message: "Invalid password ", user, success: false };
        }

        // Optionally, return some user info or a success message
        return { message: "Logged in successfully", user, success: true };
    })