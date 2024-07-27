"use server"
import { jwtVerify, JWTPayload, decodeJwt, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { get_user_phone } from './users';
import { get } from 'http';
//import { get_user_email } from './contacts';


export async function createToken(email: string) {
    const token = await new SignJWT({
        email: email,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${(86400 * 90)}s`)
        .sign(await getJwtSecretKey());

       
    return token;
}

export async function setToken(email: string) {
    const token = await createToken(email);
    if (!token) return;
    cookies().set({
        name: 'token',
        value: token,
        path: '/', // Accessible site-wide
        maxAge: (86400 * 90), // 24-hours or whatever you like
        httpOnly: true, // This prevents scripts from accessing
        sameSite: 'strict', // This does not allow other sites to access
    });
    return token;
}

export async function getJwtSecretKey() {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT Secret key is not set');
	}

	const enc: Uint8Array = new TextEncoder().encode(secret);
	return enc;
}

export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(token, await getJwtSecretKey());
		return payload;
	} catch (error) {
		return null;
	}
}

export async function getJwtData() {
	const cookieStore = cookies();
	const token = cookieStore.get('token');

	if (token) {
		try {
			const payload = await verifyJwtToken(token.value);
			if (payload) {
				const authPayload: string = payload.email as string;
				return authPayload;
			}
		} catch (error) {
			return null;
		}
	}
	return null;
}

export async function logout() {
	const cookieStore = cookies();
	const token = cookieStore.get('token');

	if (token) {
		try {
			cookieStore.delete('token');
		} catch (_) {}
	}

	const userData = cookieStore.get('userData');
	if (userData) {
		try {
			cookieStore.delete('userData');
			return true;
		} catch (_) {}
	}

	return null;
}


// export  const login = async (email: string) => {
// 	const res = await get_user_email(email);
// 	if (res?.status !== 200) return null;

// 	const token = await setToken(email);
//     if (!token) return null;

// 	return res.contact;
// }



export  const  getUserData = async () => {
	const email = await getJwtData();
	if (!email) return null;
	
	const res = await get_user_phone(email);
	if (!res) return null;

	return res;
}
