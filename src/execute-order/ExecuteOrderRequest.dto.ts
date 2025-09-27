import { ApiProperty } from "@nestjs/swagger";

export class ExecuteOrderRequestDto {
    @ApiProperty()
    public lines!: string[];

}