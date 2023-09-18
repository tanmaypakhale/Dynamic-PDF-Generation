const express = require("express");
const http = require("http");
const puppeteer = require('puppeteer')
const app = express();



app.listen(4000, () => {
  console.log(`Server is running `);
});

async function webPageToPDF(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`https://www.google.co.in/`, {
      waitUntil: "networkidle2",
    });

    await page.pdf({
    printBackground: true,
      path: "sample.pdf",
      format: "A4",
    });

    await browser.close();
    console.log("successfully created pdf");
}

webPageToPDF();