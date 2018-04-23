import puppeteer from 'puppeteer';
import config from 'config';

class Puppeteer {
  async loadBrowser() {
    this.browser = await puppeteer.launch();
  }

  async renderHTMLToPDF( filename, options = {}) {
    /* Combine the passed in options with defaults */
    const combinedOptions = {
      format: options.format || 'A4',
    };

    /* Load the browser if it isn't already loaded */
    if ( !this.browser ) {
      await this.loadBrowser();
    }

    /* Create a new blank page */
    const page = await this.browser.newPage();

    /* Navigate to the html */
    await page.goto( `http://localhost:${config.api.port}/docs/${filename}.html`, { waitUntil: 'networkidle2' });
    await page.pdf({ path: `tmp/${filename}.pdf`, ...combinedOptions });
  }
}

export default new Puppeteer();
