import {beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../auth.repo", () => ({
    default: {
        checkUserExist: vi.fn(),
        createNewUser: vi.fn(),
        insertRefreshToken: vi.fn(),
        getRefreshTokenByHash: vi.fn(),
        deleteRefreshToken: vi.fn(),
        createRefreshToken: vi.fn(),
        getUserById: vi.fn(),
    },
}));

vi.mock("../auth.utils", () => ({
    default: {
        hashPassword: vi.fn(),
        verifyPassword: vi.fn(),
        createAccessToken: vi.fn(),
        verifyAccessToken: vi.fn(),
        hashRefreshToken: vi.fn(),
        createRefreshToken: vi.fn(),
        refreshTokenExpiry: vi.fn(),
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
            message: "Unable to Create Account",
        });
    });
    test("return 201 when user successfully created", async () => {
        const mockedRepo = vi.mocked(authRepo);
        mockedRepo.checkUserExist.mockResolvedValue([]);
        mockedRepo.createNewUser.mockResolvedValue({
            id: 1,
            email: "test@test.com",
            role: "user",
        });

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
            message: "Invalid credentials",
        });
        expect(authUtils.verifyPassword).not.toHaveBeenCalled();
        expect(authUtils.createAccessToken).not.toHaveBeenCalled();
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
            "Invalid credentials"
        );

        expect(authRepo.checkUserExist).toHaveBeenCalled();
        expect(authUtils.verifyPassword).toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            status: 400,
            message: "Invalid credentials",
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
        vi.mocked(authUtils.createAccessToken).mockReturnValue("accessToken");
        vi.mocked(authUtils.createRefreshToken).mockReturnValue("refreshToken");
        vi.mocked(authUtils.hashRefreshToken);
        vi.mocked(authUtils.refreshTokenExpiry);
        vi.mocked(authRepo.insertRefreshToken);

        const result = await authServices.login(
            "test@test.com",
            "validPassword"
        );

        expect(authRepo.checkUserExist).toHaveBeenCalled();
        expect(authUtils.verifyPassword).toHaveBeenCalled();
        expect(authUtils.createAccessToken).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "Login successful",
            data: {
                id: 1,
                email: "test@test.com",
                role: "admin",
                token: {
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                },
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
            message: "Credentials not found",
        });
    });

    test("return 200 when user data exist", async () => {
        vi.mocked(authRepo.checkUserExist).mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                hash: "hashedPassword",
                role: "user",
            },
        ]);

        const result = await authServices.me("test@test.com");

        expect(authRepo.checkUserExist).toHaveBeenCalled();
        expect(result).toEqual({
            success: true,
            status: 200,
            message: "Credentials validated",
            data: {
                id: 1,
                email: "test@test.com",
                role: "user",
            },
        });
    });
});

describe("refresh()", () => {
  const incomingRefreshToken = "incoming-token";
  const hashedToken = "hashed-token";

  beforeEach(() => {
    vi.resetAllMocks();

    (authUtils.hashRefreshToken as any).mockReturnValue(hashedToken);
  });

  test("returns 401 when token is not found", async () => {
    (authRepo.getRefreshTokenByHash as any).mockResolvedValue(null);

    const result = await authServices.refresh(incomingRefreshToken);

    expect(result).toEqual({
      success: false,
      status: 401,
      message: "Invalid refresh token",
    });

    expect(authRepo.getRefreshTokenByHash).toHaveBeenCalledWith(hashedToken);
  });

  test("returns 401 when token is expired and deletes it", async () => {
    const expiredToken = {
      id: "t1",
      userId: 1,
      expiresAt: new Date(Date.now() - 1000),
    };

    (authRepo.getRefreshTokenByHash as any).mockResolvedValue(expiredToken);

    const result = await authServices.refresh(incomingRefreshToken);

    expect(authRepo.deleteRefreshToken).toHaveBeenCalledWith("t1");

    expect(result).toEqual({
      success: false,
      status: 401,
      message: "Refresh token expired",
    });
  });

  test("returns 401 when user is not found", async () => {
    const validToken = {
      id: "t2",
      userId: 5,
      expiresAt: new Date(Date.now() + 10000),
    };

    (authRepo.getRefreshTokenByHash as any).mockResolvedValue(validToken);
    (authRepo.getUserById as any).mockResolvedValue(null);

    const newToken = "new-refresh";
    (authUtils.createRefreshToken as any).mockReturnValue(newToken);
    (authUtils.hashRefreshToken as any).mockReturnValue("new-hash");
    (authUtils.refreshTokenExpiry as any).mockReturnValue(
      new Date("2030-01-01")
    );

    const result = await authServices.refresh(incomingRefreshToken);

    expect(result).toEqual({
      success: false,
      status: 401,
      message: "Credentials not found",
    });

    expect(authRepo.deleteRefreshToken).toHaveBeenCalledWith("t2");
  });

  test("rotates token and returns new credentials (happy path)", async () => {
    const validToken = {
      id: "t3",
      userId: 10,
      expiresAt: new Date(Date.now() + 10000),
    };

    (authRepo.getRefreshTokenByHash as any).mockResolvedValue(validToken);

    const user = { id: 10, email: "test@mail.com", role: "USER" };
    (authRepo.getUserById as any).mockResolvedValue(user);

    const newRefreshToken = "new-refresh-token";
    const newRefreshHash = "new-hash";
    const expiry = new Date("2030-01-01");

    (authUtils.createRefreshToken as any).mockReturnValue(newRefreshToken);
    (authUtils.hashRefreshToken as any).mockReturnValue(newRefreshHash);
    (authUtils.refreshTokenExpiry as any).mockReturnValue(expiry);

    (authUtils.createAccessToken as any).mockReturnValue("access-token");

    const result = await authServices.refresh(incomingRefreshToken);

    expect(authRepo.deleteRefreshToken).toHaveBeenCalledWith("t3");

    expect(authRepo.insertRefreshToken).toHaveBeenCalledWith(
      10,
      newRefreshHash,
      expiry
    );

    expect(result).toEqual({
      success: true,
      status: 200,
      message: "Credentials refreshed",
      data: {
        accessToken: "access-token",
        newRefreshToken,
      },
    });
  });
});
