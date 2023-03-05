import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsBoolean,
  IsInt,
  IsDate,
  IsPositive,
  IsNumber
} from "class-validator";

export class autoEditarDto{
  @IsNotEmpty()
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  marca: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  nombre: string;

  @IsNotEmpty()
  @IsBoolean()
  conPlaca: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNotEmpty()
  @IsInt()
  cantidadStock: number;

  @IsDate()
  fechaIngreso: Date;

}