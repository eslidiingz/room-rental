// company.resolver.ts

import prisma from "@/db";
import { generateToken, verifyToken } from "@/utils/jwt";
import { Company } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CompanySignInInput, CompanySignUpInput } from "./company.dto";
import { AuthPayload } from "../auth/auth.entity";


export const companyResolvers = {
  Query: {
    getUser: async (_: any, { userId }: { userId: string }) => {
      // return await prisma.user.findUnique({ where: { id: userId } });
    },

    myCompany: async (_: any, __: any, { user }: any) => {
      if (!user) throw new GraphQLError('Unauthorized', {
        extensions: {
          code: 'UNAUTHORIZED',
          http: { status: 401 },
        }
      });

      return await prisma.company.findUnique({
        where: { id: user.id },
      });
    }
  },

  Mutation: {
    companySignUp: async (_: any, { companySignUpInput }: { companySignUpInput: CompanySignUpInput }): Promise<AuthPayload> => {
      try {
        const hashedPassword = await Bun.password.hash(companySignUpInput.password)

        const newCompany = {
          ...companySignUpInput,
          password: hashedPassword,
          code: generateCode()
        }

        const companyCreated = await prisma.company.create({ data: newCompany })

        const payload = generatePayload(companyCreated)
        const token = await generateToken(payload)

        return {
          access_token: token
        }

      } catch (error: any) {
        throw new GraphQLError('Username or email already exists.', {
          extensions: {
            code: 'UNIQUE_CONSTRAINT',
          },
        })
      }
    },

    signInCompany: async (_: any, { companySignInInput }: { companySignInInput: CompanySignInInput }): Promise<AuthPayload> => {
      const { username, password } = companySignInInput

      const company = await prisma.company.findUnique({ where: { username } });

      if (!company) throw new GraphQLError('Invalid credentials', {
        extensions: {
          code: 'UNAUTHORIZED',
          http: { status: 401 },
        },
      });

      // // Check if the password matches
      const isPasswordValid = await Bun.password.verify(password, company.password);
      if (!isPasswordValid) throw new GraphQLError('Invalid credentials', {
        extensions: {
          code: 'UNAUTHORIZED',
          http: { status: 401 },
        },
      });

      const payload = generatePayload(company)
      const token = await generateToken(payload)

      return {
        access_token: token
      };
    }
  }
}


function generateCode(): string {
  // Generate 3 random uppercase letters
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) // ASCII A-Z is 65-90
  ).join('');

  // Get the current year (last two digits) and month
  const date = new Date();
  const year = date.getFullYear().toString().slice(2); // Get last 2 digits of the year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (1-12) and pad with zero if needed

  // Generate 6 random digits
  const digits = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10).toString()
  ).join('');

  // Combine letters, year, month, and digits to form the final code
  return `${letters}${year}${month}${digits}`;
}

function generatePayload(_company: Company) {
  const { password, is_active, created_at, updated_at, deleted_at, ...payload } = _company

  return payload
}