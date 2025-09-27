import { ApiProperty } from "@nestjs/swagger";

export class ExecuteOrderResponseDto {
    @ApiProperty({
        type: String,
        example: 'https://pay.ideal.nl/transactions/restoflink',
    })
    public url!: string;
}
