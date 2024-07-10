import { Request } from "express"

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"

import { AuthService } from "./auth.service"

function extractTokenFromRequest(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(" ") ?? []

  return type === "Bearer" ? token : undefined
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = extractTokenFromRequest(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const userId = this._authService.verifyJwt(token)

      request.userId = userId

      return true
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
