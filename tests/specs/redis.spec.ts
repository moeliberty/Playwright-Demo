import { test, expect, Page } from '@playwright/test';
import { changeKey } from '../tools/redis';

test.describe('Redis Test', () => {
    test('should change redis var', async ({ page }) => {
        await changeKey('mael', '01928373');
    });
});
