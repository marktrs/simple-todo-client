import type { Browser, Page } from 'playwright'
import { chromium } from 'playwright'
import type { PreviewServer } from 'vite'
import { preview } from 'vite'
import { afterAll, beforeAll, describe, test } from 'vitest'

// unstable in Windows, TODO: investigate
describe('Login', async () => {
	let server: PreviewServer
	let browser: Browser
	let page: Page

	beforeAll(async () => {
		server = await preview({ preview: { port: 3000 } })
		browser = await chromium.launch()
		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()))
		})
	})

	test('should render page', async () => {
		await page.goto('http://localhost:3000/login')
	})
})
