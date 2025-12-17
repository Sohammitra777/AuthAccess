import { beforeEach, describe, expect, test, vi } from "vitest";
import utils from "../shared.util";

vi.mock("../shared.util", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("../../modules/auth/auth.utils", () => ({
    default: {
        verifyToken: vi.fn(),
    },
}));

import authMiddleware from "../shared.middleware";
import authUtils from "../../modules/auth/auth.utils";
describe("testing authMiddleware.validateRequest", () => {
    test("return error if validation fails", () => {
        const mockSchema: any = {
            safeParse: vi.fn(),
        };

        const req: any = { body: {} };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        const next: any = vi.fn();
        mockSchema.safeParse.mockReturnValue({
            success: false,
            error: { issues: ["invalid"] },
        });
        const middleware = authMiddleware.validateRequest(mockSchema);
        middleware(req, res, next);

        expect(utils.error).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test("calls next when validation succeeds", () => {
        const mockSchema: any = {
            safeParse: vi.fn(),
        };

        const req: any = { body: {} };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        const next: any = vi.fn();
        mockSchema.safeParse.mockReturnValue({
            success: true,
            data: { email: "test@test.com" },
        });

        const middleware = authMiddleware.validateRequest(mockSchema);
        middleware(req, res, next);

        expect(req.body).toEqual({ email: "test@test.com" });
        expect(next).toHaveBeenCalled();
    });
});

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
            headers: {
                authorization: undefined,
            },
        };

        const middleware = authMiddleware.requireAuth();
        middleware(req, res, next);

        expect(utils.error).toHaveBeenCalled();
        expect(authUtils.verifyToken).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test("returns 401 verify token throws", () => {
        const req: any = {
            body: {},
            headers: {
                authorization: "Bearer abctokenefg",
            },
        };

        vi.mocked(authUtils.verifyToken).mockImplementation(() => {
            throw new Error("invalid token");
        });
        const middleware = authMiddleware.requireAuth();
        middleware(req, res, next);

        expect(authUtils.verifyToken).toHaveBeenCalled();
        expect(utils.error).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test("sets req.user and calls next when token is valid", () => {
        const req: any = {
            body: {},
            headers: {
                authorization: "Bearer abctokenefg",
            },
        };

        const mockedVerifyToken = vi.mocked(authUtils);
        mockedVerifyToken.verifyToken.mockReturnValue({
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
        expect(authUtils.verifyToken).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});

describe("testing authMiddleware.requireRole", () => {
    let res: any, next: any;
    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
        vi.clearAllMocks();
    });
    test("return 401 if user/role not defined", () => {
        const req: any = {
            user: { role: undefined },
        };

        const middleware = authMiddleware.requireRole("user");
        middleware(req, res, next);

        expect(utils.error).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        expect(utils.error).toHaveBeenCalledWith(
            res,
            { error: "Not authenticated" },
            401
        );
    });

    test("return forbidden 403 if role is insufficient", () => {
        const req: any = {
            user: { role: "admin" },
        };

        const middleware = authMiddleware.requireRole("user");
        middleware(req, res, next);
        expect(utils.error).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        expect(utils.error).toHaveBeenCalledWith(
            res,
            { error: "Forbidden: insufficient role" },
            403
        );
    });

    test("call next when valid role", () => {
        const req: any = {
            user: { role: "admin" },
        };

        const middleware = authMiddleware.requireRole("admin");
        middleware(req, res, next);
        expect(utils.error).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});
