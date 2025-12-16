import { describe, expect, test, vi } from "vitest";

vi.mock("../auth.repo", () => ({
    default: {
        checkUserExist: vi.fn(),
        createNewUser: vi.fn(),
    },
}));

import authRepo from "../auth.repo";
import authServices from "../auth.services";
describe("authServices.signup test", () => {
    test("return success: false if length greater than 0", async () => {
        const mockedRepo = vi.mocked(authRepo);
        mockedRepo.checkUserExist.mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                hash: "hashpas1234",
                role: "user",
            },
        ]);
        const result = await authServices.signup("email", "password");

        expect(mockedRepo.checkUserExist).toHaveBeenCalled();
        expect(mockedRepo.createNewUser).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            status: 409,
            message: "User already exist",
        });
    });
    test("return success: true if length is 0", async () => {
        const mockedRepo = vi.mocked(authRepo);
        mockedRepo.checkUserExist.mockResolvedValue([]);
        mockedRepo.createNewUser.mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                role: "user",
            },
        ]);

        const result = await authServices.signup("email", "password");
        expect(mockedRepo.checkUserExist).toHaveBeenCalled();
        expect(mockedRepo.createNewUser).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 201,
            message: "signup successful",
            data: {
                id: 1,
                email: "test@test.com",
                role: "user",
            },
        });
    });
});
