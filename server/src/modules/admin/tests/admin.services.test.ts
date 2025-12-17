import { describe, expect, test, vi } from "vitest";

vi.mock("../admin.repo", () => ({
    default: {
        getUsers: vi.fn(),
        findById: vi.fn(),
        findByEmail: vi.fn(),
        createUser: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
    },
}));

import adminServices from "../admin.services";
import adminRepo from "../admin.repo";

describe("testing adminServices.getUsers", () => {
    test("return message No user exist when db empty", async () => {
        vi.mocked(adminRepo.getUsers).mockResolvedValue([]);

        const result = await adminServices.getUsers();

        expect(adminRepo.getUsers).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "No user exist",
            data: [],
        });
    });

    test("return message User array", async () => {
        vi.mocked(adminRepo.getUsers).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                role: "admin",
            },
        ]);

        const result = await adminServices.getUsers();

        expect(adminRepo.getUsers).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "User array",
            data: { id: 1, email: "test@test.com", role: "admin" },
        });
    });
});

describe("testing adminServices.createUser", () => {
    test("return 409 when user is present by email", async () => {
        vi.mocked(adminRepo.findByEmail).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                role: "admin",
            },
        ]);

        const result = await adminServices.createUser({
            email: "test@test.com",
            password: "password",
            role: "admin",
        });

        expect(adminRepo.findByEmail).toHaveBeenCalled();
        expect(adminRepo.createUser).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            status: 409,
            message: "User already exists",
            data: { id: 1, email: "test@test.com", role: "admin" },
        });
    });

    test("return 201 when user is NOT present by email", async () => {
        vi.mocked(adminRepo.findByEmail).mockResolvedValue([]);
        vi.mocked(adminRepo.createUser).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                role: "admin",
            },
        ]);
        const result = await adminServices.createUser({
            email: "test@test.com",
            password: "password",
            role: "admin",
        });

        expect(adminRepo.findByEmail).toHaveBeenCalled();
        expect(adminRepo.createUser).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 201,
            message: "User created",
            data: { id: 1, email: "test@test.com", role: "admin" },
        });
    });
});

describe("testing adminServices.updateUser", () => {
    test("return 200 when user updated", async () => {
        vi.mocked(adminRepo.updateUser).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                role: "user",
            },
        ]);

        const result = await adminServices.updateUser(1, {
            email: "test@test.com",
            role: "admin",
        });

        expect(adminRepo.updateUser).toHaveBeenCalledOnce();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "Data updated successfully",
            data: { id: 1, email: "test@test.com", role: "user" },
        });
    });
});

describe("testing adminServices.deleteUser", () => {
    test("returns 404 when no user exist with respected id", async () => {
        vi.mocked(adminRepo.findById).mockResolvedValue([]);

        const result = await adminServices.deleteUser(1);

        expect(adminRepo.findById).toHaveBeenCalled();
        expect(adminRepo.deleteUser).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            status: 404,
            message: "User does not exist",
        });
    });

    test("return 200 when user is deleted", async () => {
        vi.mocked(adminRepo.findById).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                role: "user",
            },
        ]);

        vi.mocked(adminRepo.deleteUser).mockResolvedValue([
            {
                email: "test@test.com",
                role: "user",
            },
        ]);

        const result = await adminServices.deleteUser(1);

        expect(adminRepo.findById).toHaveBeenCalled();
        expect(adminRepo.deleteUser).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "User deleted successfully",
            data: { email: "test@test.com", role: "user" },
        });
    });
});
