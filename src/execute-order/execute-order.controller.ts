import { Body, Controller, Post } from '@nestjs/common';
import { chromium, Page } from 'playwright';
import { ExecuteOrderRequestDto } from './ExecuteOrderRequest.dto';
import { ExecuteOrderResponseDto } from './ExecuteOrderResponse.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('execute-order')
export class ExecuteOrderController {

    @Post()
    @ApiResponse({
        status: 200,
        description: 'The URL of the order',
        type: ExecuteOrderResponseDto,
    })
    async executeOrder(@Body() dto: ExecuteOrderRequestDto): Promise<ExecuteOrderResponseDto> {

        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        console.log(dto.lines);
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

        for (const line of dto.lines) {
            const fn = new AsyncFunction('page', line);
            await fn(page);
        }


        while (true) {
            await page.waitForTimeout(1000);
            if (page.url().includes('ideal')) {
                break;
            }
        }

        const pageUrl = page.url();
        await browser.close();
        return { url: pageUrl };
    }
}
