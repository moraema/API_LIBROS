import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenRepositoryI } from '../../domain/repository/token.repository';

@Injectable()
export class TokenRepositoryImp implements TokenRepositoryI {
  constructor(private readonly _jwtService: JwtService) {}
  async sign(payload: any): Promise<string> {
    try {
      return await this._jwtService.sign(payload);
    } catch (error) {
      throw new Error(error);
    }
  }
  async decode(token: string): Promise<any> {
    try {
      return await this._jwtService.decode(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}