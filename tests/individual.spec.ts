import test, { expect } from "@playwright/test"


test.describe("Test NEO Page" , () => {

    test.beforeEach(async({page}) =>{

        await page.goto("/")
        await page.waitForSelector(":has-text('Near-Earth Object (NEO) APIs')", {state : "visible"})
        page.getByText("START").click()
        await page.waitForTimeout(3000)
        page.getByRole("link", {name: "View in Explorer"}).first().click()
        await page.waitForTimeout(3000)

    })

    test("Clicking on kilometerh to show meters diameter range graph", async ({page})=>{

        page.getByRole("button", {name: "Dimensions"}).click()
        await page.getByRole('combobox', { name: 'Scale Kilometers' }).click()
        page.getByRole('option', { name: 'Meters', exact: true }).click()
        await page.waitForTimeout(1000)
        await page.waitForSelector(":has-text('meters')")
        let meterItems = page.locator(":has-text('meters')")
        expect(Array.isArray(meterItems))
        

    })




})