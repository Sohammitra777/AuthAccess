import { describe, expect, test, vi } from "vitest";
import utils from "../../../shared/util";

vi.mock("../../../shared/util", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

import authMiddleware from "../auth.middleware";
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
            data: { email: "test@test.com" },
        });

        const middleware = authMiddleware.validateRequest(mockSchema);
        middleware(req, res, next);

        expect(req.body).toEqual({ email: "test@test.com" });
        expect(next).toHaveBeenCalled();
    });
});
