import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../../../shared/shared.util", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

import utils from "../../../shared/shared.util";
import adminMiddleware from "../admin.middleware";

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

        const middleware = adminMiddleware.requireRole("user");
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

        const middleware = adminMiddleware.requireRole("user");
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

        const middleware = adminMiddleware.requireRole("admin");
        middleware(req, res, next);
        expect(utils.error).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});
