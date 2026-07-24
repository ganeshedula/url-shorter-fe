import { authService } from "./authService";

export const userService = {
  getCurrentUser: authService.me,
};
