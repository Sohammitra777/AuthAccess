import { vi, beforeEach, describe, expect, test } from "vitest";

vi.mock("../../../shared/shared.util", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("../auth.utils", () => ({
    default: {
        verifyAccessToken: vi.fn(),
    },
}));

import authMiddleware from "../auth.middleware";
import utils from "../../../shared/shared.util";
import authUtils from "../auth.utils";

describe("testing authMiddleware.requireAuth", () => {
    let res: any, next: any;
    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
        vi.clearAllMocks();
    });

    test("returns 401 when token is invalid", () => {
        const req: any = {
            body: {},
            cookies: {
                accessToken: undefined,
            },
        };

        const middleware = authMiddleware.requireAuth();
        middleware(req, res, next);

        expect(utils.error).toHaveBeenCalled();
        expect(authUtils.verifyAccessToken).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test("returns 401 verify token throws", () => {
        const req: any = {
            body: {},
            cookies: {
                accessToken: "accessToken",
            },
        };

        vi.mocked(authUtils.verifyAccessToken).mockImplementation(() => {
            throw new Error("invalid token");
        });
        const middleware = authMiddleware.requireAuth();
        middleware(req, res, next);

        expect(authUtils.verifyAccessToken).toHaveBeenCalled();
        expect(utils.error).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test("sets req.user and calls next when token is valid", () => {
        const req: any = {
            body: {},
            cookies: {
                accessToken: "accessToken",
            },
        };

        vi.mocked(authUtils.verifyAccessToken).mockReturnValue({
            userId: 1,
            userEmail: "test@test@gmail.com",
            userRole: "user",
        });

        const middleware = authMiddleware.requireAuth();
        middleware(req, res, next);

        expect(req.user).toEqual({
            id: 1,
            email: "test@test@gmail.com",
            role: "user",
        });
        expect(authUtils.verifyAccessToken).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});

describe("testing authMiddleware.validateRefreshToken", () => {
    let res: any, next: any;
    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
        vi.clearAllMocks();
    });

    test("return 401 when no refresh token", () => {
        const req: any = {
            cookies: {
                refreshToken: undefined,
            },
        };

        const middleware = authMiddleware.validateRefreshToken();
        middleware(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(utils.error).toHaveBeenCalled();
    });

    test("return 401 when no refresh token", () => {
        const req: any = {
            cookies: {
                refreshToken: "validRefreshToken",
            },
        };

        const middleware = authMiddleware.validateRefreshToken();
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(utils.error).not.toHaveBeenCalled();
    });
});
