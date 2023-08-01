const puppeteer = require('puppeteer');
const axios = require('axios');

async function captureScreenshotAndUpload(url) {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Capture the screenshot as a Base64 encoded string
    const screenshot = await page.screenshot({ encoding: 'base64' });

    // Close the browser
    await browser.close();

    // Upload the screenshot to your library using Axios (You may use your preferred library or method)
    const response = await axios.post('http://localhost:3000/upload/report/', {
      screenshot: screenshot,
      filename: 'screenshot.png', // You can change the filename as needed
    });

    console.log('Screenshot uploaded successfully!', response.data);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  }
}

 // Replace this with the URL of the page you want to capture

module.exports.captureScreenshotAndUpload = captureScreenshotAndUpload('https://pptr.dev/');

