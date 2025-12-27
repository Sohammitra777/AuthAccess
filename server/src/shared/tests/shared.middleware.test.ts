import { describe, expect, test, vi } from "vitest";
import utils from "../shared.util";

vi.mock("../shared.util", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("../../modules/auth/auth.utils", () => ({
    default: {
        verifyAccessToken: vi.fn(),
    },
}));

import authMiddleware from "../shared.middleware";
import authUtils from "../../core/auth/auth.utils";

describe("testing authMiddleware.validateBody", () => {
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
        const middleware = authMiddleware.validateBody(mockSchema);
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

        const middleware = authMiddleware.validateBody(mockSchema);
        middleware(req, res, next);

        expect(req.body).toEqual({ email: "test@test.com" });
        expect(next).toHaveBeenCalled();
    });
});




