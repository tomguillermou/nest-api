import { Request } from "express"

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"

import { TokenService } from "./token.service"

function extractTokenFromRequest(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(" ") ?? []

  return type === "Bearer" ? token : undefined
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = extractTokenFromRequest(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      request.userId = this._tokenService.verify(token)

      return true
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
