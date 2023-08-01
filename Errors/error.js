var express = require('express');
var router = express.Router();

//For error handling 
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


router.get('/', (req, res) => {
    console.log(req.query.url);
    captureScreenshotAndUpload(req.query.url);
    res.redirect('/')
})


module.exports = router;



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
        // const response = await axios.post('https://42125-3000.2.codesphere.com/upload/report/', {
        //   file: screenshot,
        //   filename: 'screenshot.png', // You can change the filename as needed
        // });
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/:/g, '-').split('.')[0]; // Format: YYYY-MM-DDTHH-MM-SS

        // Generate the file name with the current date and time
        const fileName = `screenshot_${formattedDate}.png`;
        const folderName = 'screenshots';
        const folderPath = path.join(__dirname, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        
        // Save the screenshot data to a local file
        const filePath = path.join(folderPath, fileName);
        fs.writeFileSync(filePath, Buffer.from(screenshot, 'base64'));


        console.log('Screenshot uploaded successfully!');
    } catch (error) {
        console.error('Error capturing screenshot:', error);
    }
}
