const express = require("express");
const http = require("http");
const puppeteer = require('puppeteer')
const app = express();
require("dotenv").config();


app.listen(4000, () => {
  console.log(`Server is running `);
});

async function webPageToPDF(){
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
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