import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',use:{baseURL:process.env.SOUPOTHEQUE_TEST_URL||'http://127.0.0.1:5188/soupotheque/',headless:true,launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}},workers:1,reporter:'list'});
