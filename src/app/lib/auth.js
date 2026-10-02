import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BUTTER_AUTH_URL_APE);
const db = client.db();

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url, token }, request) => {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Reset your password",
                html: `Click <a href="${url}">here</a> to reset your password.`,
            });
        },
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Verify your email address",
                html: `Click <a href="${url}">here</a> to verify your email.`,
            });
        },

        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 24 * 7 * 3600,
    },

    socialProviders: {
        google: {
            clientId: process.env.BUTTER_AUTH_ID,
            clientSecret: process.env.BUTTER_AUTH_SERATE,
        },

        github: {
            clientId: process.env.BUTTER_AUTH_GITHUB_ID,
            clientSecret: process.env.BUTTER_AUTH_GITHUB_SECRITE,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});