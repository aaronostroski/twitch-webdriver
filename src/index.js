require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const {URL, username, password} = require('./config');
const fs = require('fs');
const path = require('path');

const initialize = () => {

    navigate();
}

const navigate = async () => {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();
    
    try {
        await driver.get(URL);
        await driver.findElement(By.className('tw-core-button--padded')).click();
        await setTimeout(async () => {
            await driver.findElement(By.css("input[autocomplete=username]")).sendKeys(username, Key.RETURN);
        }, 3000);
        await setTimeout(async () => {
            await driver.findElement(By.css("input[autocomplete=current-password]")).sendKeys(password, Key.RETURN);
        }, 3000);

        await restartNavigate(driver);
    } catch (e) {
        fs.write('log-error.log', 'test');
        throw new Error(e);
    }

}

const restartNavigate = driver => {

    setTimeout(async () => {
        generateLog(`Restart started! - ${new Date()}`)
        await driver.quit();
        initialize();
    }, 10000);

}

const generateLog =  async message => {
    let pathLog = path.join(`${__dirname}${/tmp/}log-${new Date().toISOString().slice(0, 10)}.log`);

    await fs.writeFile(pathLog, message, { flag: 'a+'}, err => {
        console.log(err);
    });
    return;
}

initialize();
