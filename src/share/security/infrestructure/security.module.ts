import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { configService } from "src/share/config/configService";
import { SecurityGuard } from "../application/guards/security.guard";
import { TokenService } from "../application/service/token.service";
import { TokenRepositoryImp } from "./jwt/tokenRepository.imp";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: configService.get("JWT_SECRET"),
            signOptions: {
                expiresIn: configService.get("JWT_EXPIRATION_TIME"),
            },
        })
    ],
    providers: [
        SecurityGuard,
        TokenService,
        TokenRepositoryImp
    ],
    exports: [
        SecurityGuard,
        TokenService,
        TokenRepositoryImp,
    ],
})
export class SecurityModule {}