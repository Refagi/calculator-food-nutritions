import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config/config.js';
import prisma from '../../prisma/client.js';
import { tokenTypes } from './token.js';
import { generateRandomPassword } from "../utils/randomPassword.js";
export const jwtStrategy = new Strategy({
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
});
export const googleStrategy = new GoogleStrategy({
    clientID: config.google.credentialId,
    clientSecret: config.google.credentialSecret,
    callbackURL: `http://localhost:3000/v1/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await prisma.user.findUnique({
            where: { googleId: profile.id },
        });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: profile.id,
                    email: profile.emails?.[0].value || "",
                    password: generateRandomPassword(),
                    name: profile.displayName,
                },
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
});
//# sourceMappingURL=passport.js.map