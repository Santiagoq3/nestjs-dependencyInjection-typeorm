import { Controller,Get,Post,Delete,Body,Patch,Param,Query,UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService){

    }

    @Post("/signup")
    createUser(@Body() body: CreateUserDto){
        this.usersService.create(body.email,body.password)
    }

    @Get(":id")
    findUser(@Param("id") id: string){

        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    findAllUsers(@Query("email") email: string){
        return this.usersService.find(email)
    }

    @Delete(":id")
    delete(@Param("id") id: string){
        return this.usersService.remove(parseInt(id))
    }

    @Patch(":id")
    update(@Param("id") id:string,@Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id),body)
    }
    




}
