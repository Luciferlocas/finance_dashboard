import { Request, Response } from "express";
import { UserRegistrationSchema, UserLoginSchema, UpdateRoleSchema, RemoveUserSchema } from "../schema";
import { AuthService } from "../services";

export class AuthController {
    static async register(req: Request, res: Response) {
        const validationResult = UserRegistrationSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: validationResult.error.errors,
            });
        }

        try {
            const newUser = await AuthService.register(validationResult.data);
            return res.status(201).json(newUser);
        } catch (err: any) {
            if (err.message === "User already exists") {
                return res.status(409).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message || "Unknown error",
            });
        }
    }

    static async login(req: Request, res: Response) {
        const validationResult = UserLoginSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: validationResult.error.errors,
            });
        }

        try {
            const result = await AuthService.login(validationResult.data);
            return res.status(200).json(result);
        } catch (err: any) {
            if (err.message === "Wrong email or password") {
                return res.status(401).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message || "Unknown error",
            });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await AuthService.getAllUsers();
            return res.status(200).json(users);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message || "Unknown error",
            });
        }
    }

    static async updateRole(req: Request, res: Response) {
        const validationResult = UpdateRoleSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: validationResult.error.errors,
            });
        }

        if (req.user.id === validationResult.data.id) {
            return res.status(400).json({
                message: "You cannot update your own role",
            });
        }

        try {
            const updatedUser = await AuthService.updateRole(validationResult.data);
            return res.status(200).json(updatedUser);
        } catch (err: any) {
            if (err.message === "User not found") {
                return res.status(404).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message || "Unknown error",
            });
        }
    }

    static async removeUser(req: Request, res: Response) {
        const validationResult = RemoveUserSchema.safeParse(req.params);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: validationResult.error.errors,
            });
        }

        if (req.user.id === validationResult.data.id) {
            return res.status(400).json({
                message: "You cannot remove yourself",
            });
        }

        try {
            const removedUser = await AuthService.removeUser(validationResult.data);
            return res.status(200).json(removedUser);
        } catch (err: any) {
            if (err.message === "User not found") {
                return res.status(404).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message || "Unknown error",
            });
        }
    }
}
