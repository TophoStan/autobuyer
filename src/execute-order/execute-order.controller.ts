import { Controller, Get } from '@nestjs/common';
import { chromium, Page } from 'playwright';

@Controller('execute-order')
export class ExecuteOrderController {

    @Get()
    async executeOrder(): Promise<string> {

        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();

        await this.AddWheyPowderToCart(page, 'Vanille');

        await this.Checkout(page);


        while (true) {
            await page.waitForTimeout(1000);
            if (page.url().includes('ideal')) {
                break;
            }
        }

        return page.url();
    }

    private async AddWheyPowderToCart(page: Page, flavour: string) : Promise<void> {

        await page.goto('https://upfront.nl/products/whey');

        await page.click('xo-toggle-trigger[xo-name="variant-flavour-toggle-main-product"]');
        await page.waitForTimeout(2000);

        await page
            .locator('div.variant-flavour-selector__popover-inner')
            .locator('span')
            .filter({ hasText: 'Vanille' })
            .first()
            .click();
        await page.waitForTimeout(2000);


        await page.getByText('Voeg toe').first().click();

        await page.waitForTimeout(2000);
    }

    private async Checkout(page: Page) : Promise<void> {
        await page.getByText('Mand').first().click(); // waits until clickable
        await page.getByText('Ik ga afrekenen').first().click();

        await page.fill('input[name="email"]', 'stanthooft@gmail.com');
        await page.fill('input[name="firstName"]', 'Stan');
        await page.fill('input[name="lastName"]', 'Hooft');
        await page.fill('input[name="address1"]', 'Hoveniersberg 10');
        await page.click('#shipping-address1-options li:first-child');

        await page.fill('input[name="reductions"]', 'LISAVANDERVALK');
        var discountButton = await page.getByLabel('Pas Kortingscode Toe').first();

        while (true) {
            var res = await discountButton.getAttribute('disabled');
            console.log(res);
            if (!res) {
                await page.waitForTimeout(500);
                await discountButton.click();
                break;
            }
        }

        await page.fill('input[name="phone"]', '0612345678');
        await page.getByRole('button', { name: 'Nu betalen' }).first().click();

    }
}
