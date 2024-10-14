import { SignJWT, jwtVerify } from 'jose';

// Secret key for signing the JWT. In production, keep this in an environment variable.
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

// Function to generate a JWT token
export async function generateToken(payload: any): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })  // Set the algorithm to HS256
        .setIssuedAt()
        .setExpirationTime('2h')  // Token valid for 2 hours
        .sign(JWT_SECRET);  // Sign the JWT with the secret
}

// Function to verify a JWT token
export async function verifyToken(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;  // Return the decoded payload if the token is valid
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
