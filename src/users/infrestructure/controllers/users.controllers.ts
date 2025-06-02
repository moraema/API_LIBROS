import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/users/application/service/user.service";
import { UpdateUserDto } from "../ports/class-validator/update-user.dto";
import { CreateUserDto } from "../ports/class-validator/user-create.dto";
import { loginReqDto } from "../ports/class-validator/login-req.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
   constructor(
     @Inject(UserService) private readonly userService: UserService,
   ) {}

   @Post('login')
   @HttpCode(200)
   @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica al usuario y devulve el token JWT'})
   @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Usuario autenticado exitosamente'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Credenciales inválidas' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos de entrada inválidos' 
  })
   login(@Body() loginReq: loginReqDto) {
    return this.userService.login(loginReq);
   }

   @Post('register')
   @ApiOperation({ summary: 'Registrar un nuevo usuario' })
   @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuario registrado exitosamente' })
   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
   @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    createUser(@Body() createUser: CreateUserDto) {
      return this.userService.createUser(createUser);
    }
}