import test, { chromium, expect } from "@playwright/test";



test.describe("Test NEO Dashboard", () => {


    test.beforeEach(async ( {page}) => {

        await page.goto("/")
        await page.waitForSelector(":has-text('Near-Earth Object (NEO) APIs')", {state : "visible"})
        page.getByText("START").click()


    })


    test("Dashboard should display should display neo lists on load", async ({page}) => {

        
            await page.waitForSelector(':has-text("Reference Id")')
            const selector = page.getByText("Reference Id")
            expect(selector).toBeVisible


    })

    test("Dashboard on clicking Live feed should display livefeed", async ({page}) => {
        await page.waitForSelector(':has-text("Feeds")')
        await page.getByRole('button', { name: 'Feeds' }).click();
        await page.waitForTimeout(2000)

        page.getByRole('link', { name: 'Live Feed' }).click()
        await page.waitForTimeout(5000)
        const pageview = page.getByRole('heading').filter({hasText : "NEOs"})
        expect(pageview).toBeVisible()


    })

    test("Dashboard on clicking Historial Feed shiuld  should display a form " , async ({page}) =>{

        await page.waitForSelector(':has-text("Feeds")')
        await page.getByRole('button', { name: 'Feeds' }).click();
        await page.waitForTimeout(2000)
        page.getByRole('link', { name: 'Historical Feeds' }).click()
        await page.waitForTimeout(5000)
        const pageview = page.getByRole('button', { name: 'Search NEOs' })
        expect(pageview).toBeVisible()
        
     
    })

    test("Dashboard on clicking Search should display a form " , async ({page}) =>{

        await page.waitForSelector(':has-text("Feeds")')
        await page.getByRole('button', { name: 'Search', exact: true }).click();
        await page.waitForTimeout(2000)
        page.getByRole('link', { name: 'Search By name' }).click()
        await page.waitForTimeout(5000)
        const pageview = page.getByRole('button', { name: 'Search NEOs' })
        expect(pageview).toBeVisible()
        
     
    })


})

