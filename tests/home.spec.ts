import test, { chromium, expect } from "@playwright/test";



test.describe("Test Home Page", () => {


    test.beforeEach(async ( {page}) => {

        await page.goto("/")

    })


    test("Home page should have title as 2025 Space Odyssey", async ({page}) => {

        await page.waitForSelector('text="2025 Space Odyssey"');
        const titleElement = await page.getByText("2025 Space Odyssey")
        expect(titleElement).toBeVisible()

    })

    test("Home page should have a navigations for NEO dashboard ", async ({page}) => {

        await page.waitForTimeout(3000)
        const linkToNEO = page.getByRole("link" ,{name : "neo"})
        linkToNEO.click({force : true})
        await page.waitForTimeout(3000)
        const routeUrl =  page.url()
        expect(routeUrl).toContain("neo")


    })

    test("Home page should have a description of NEOs " , async ({page}) =>{
        await page.waitForSelector(":has-text('Near-Earth Object (NEO) APIs')", {state : "visible"})
        const descriptionText = "Near-Earth Object (NEO) APIs"
        const textElement = page.getByText(descriptionText)
        expect(textElement).toBeVisible()
    })


})

