import { chromium } from '@playwright/test'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/svelte'
import type { Browser } from 'playwright'
import type { ComponentProps } from 'svelte'
import type { PreviewServer } from 'vite'
import { preview } from 'vite'
import Navbar from '../../routes/navbar.svelte'

describe('navbar.svelte', () => {
	let server: PreviewServer
	let browser: Browser

	beforeAll(async () => {
		server = await preview({ preview: { port: 3000 } })
		browser = await chromium.launch()
	})

	afterEach(() => cleanup())

	afterAll(async () => {
		await browser.close()
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()))
		})
	})

	it('should render the component', () => {
		const navbarProps: ComponentProps<Navbar> = {}
		const navbarPreview = render(Navbar, navbarProps)
		expect(navbarPreview.container).toBeInTheDocument()
	})
})
