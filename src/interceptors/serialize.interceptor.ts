import { UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {plainToClass} from "class-transformer"

interface ClassContructor{
    new (...args: any[]): {}
}

export function Serialize(dto : ClassContructor){

    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto: any){

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        console.log("corriendo antes de entrar al controlador", context)

        return next.handle().pipe(
            map((data: any)=>{
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}