import { describe, expect, test, vi } from "vitest";

vi.mock("../auth.repo", () => ({
    default: {
        checkUserExist: vi.fn(),
        createNewUser: vi.fn(),
    },
}));

vi.mock("../auth.utils", () => ({
    default: {
        verifyPassword: vi.fn(),
        signinToken: vi.fn(),
    },
}));

import authRepo from "../auth.repo";
import authServices from "../auth.services";
import authUtils from "../auth.utils";
describe("authServices.signup test", () => {
    test("return 409 in case of conflict", async () => {
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
    test("return 201 when user successfully created", async () => {
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

describe("authService.login test", () => {
    test("return 400 when user not regiesterd", async () => {
        vi.mocked(authRepo.checkUserExist).mockResolvedValue([]);
        const result = await authServices.login("test@test.com", "validPass");

        expect(result).toEqual({
            success: false,
            status: 400,
            message: "User not registered",
        });
        expect(authUtils.verifyPassword).not.toHaveBeenCalled();
        expect(authUtils.signinToken).not.toHaveBeenCalled();
    });

    test("return 400 when invalid password", async () => {
        vi.mocked(authRepo.checkUserExist).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                hash: "hashedpass",
                role: "admin",
            },
        ]);

        vi.mocked(authUtils.verifyPassword).mockResolvedValue(false);

        const result = await authServices.login(
            "text@test.com",
            "invalidPassword"
        );

        expect(authRepo.checkUserExist).toHaveBeenCalled();
        expect(authUtils.verifyPassword).toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            status: 400,
            message: "Invalid Password",
        });
    });

    test("return 200 when user exist and password is valid", async () => {
        vi.mocked(authRepo.checkUserExist).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                hash: "hashedpass",
                role: "admin",
            },
        ]);

        vi.mocked(authUtils.verifyPassword).mockResolvedValue(true);
        vi.mocked(authUtils.signinToken).mockReturnValue("validToken");

        const result = await authServices.login(
            "test@test.com",
            "validPassword"
        );

        expect(authRepo.checkUserExist).toHaveBeenCalled();
        expect(authUtils.verifyPassword).toHaveBeenCalled();
        expect(authUtils.signinToken).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "Login successful",
            data: {
                id: 1,
                email: "test@test.com",
                role: "admin",
                token: "validToken",
            },
        });
    });
});

describe("testing authServices.me", () => {
    test("return 404 when user data does not exist", async () => {
        vi.mocked(authRepo.checkUserExist).mockResolvedValue([]);

        const result = await authServices.me("test@test.com");

        expect(authRepo.checkUserExist).toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            status: 404,
            message: "User not found",
        });
    });

    test("return 200 when user data exist", async () => {
        vi.mocked(authRepo.checkUserExist).mockResolvedValue([
            {
                id: 1, 
                email: "test@test.com", 
                hash: "hashedPassword",
                role: "user"
            }
        ])

        const result = await authServices.me("test@test.com"); 

        expect(authRepo.checkUserExist).toHaveBeenCalled(); 
        expect(result).toEqual({
            success: true,
            status: 200,
            data: {
                id: 1,
                email: "test@test.com",
                role: "user",
            },
        })
    })
});
