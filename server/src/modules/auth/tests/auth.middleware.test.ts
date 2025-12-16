import { beforeEach, describe, expect, test, vi } from "vitest";
import utils from "../../../shared/util";

vi.mock("../../../shared/util", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("../auth.utils", () => ({
    default: {
        verifyToken: vi.fn(),
    },
}));

import authMiddleware from "../auth.middleware";
import authUtils from "../auth.utils";
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
