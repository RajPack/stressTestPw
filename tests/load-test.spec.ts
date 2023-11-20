import { test, expect, Page, BrowserContext } from '@playwright/test';

const appURL = 'https://google.com'
const loadTestTimes = 2;
const WaitTime = 10000

async function loadApp(context: BrowserContext) {
  const page = await context.newPage();
  await page.goto(appURL)
  await waitTime(WaitTime)
}

function waitTime(ms: number) {
  const promise = new Promise((resolve) =>{
    setTimeout(() => resolve(true), ms)
  })
  return promise;
}

test('load app n times in n browser tabs', async ({context }) => {
  let count = 0;
  const pagePromises: Promise<any>[] = []
  while(count < loadTestTimes) {
    pagePromises.push(loadApp(context))
    count = count + 1;
  }
  await Promise.allSettled(pagePromises)
});


