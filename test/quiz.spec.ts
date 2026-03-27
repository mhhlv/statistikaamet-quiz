import { test, expect } from '@playwright/test';

test("Introduction is displayed on startup.", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading")).toHaveText("Statistikaameti viktoriin");
  await expect(page.getByText("Kui hästi sa tunned Eestimaad? Oled tippekspert või täielik null? Selles viktoriinis sa leiad erineva raskusega küsimusi Eesti statistiliste andmete kohta. Pane end proovile ja saa oma pädevuse tasemet teada!")).toBeVisible();
});

test("Continue button takes you to the first question.", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button")).toBeVisible();
  await expect(page.getByRole("button")).toHaveText("Edasi");

  await page.getByRole("button").click();

  await expect(page.getByText("Mis on Eesti rahvaarv 2026. aasta alguse seisuga?")).toBeVisible();
  await expect(page.getByRole("button", { name: "1.257.980 inimest" })).toBeVisible();
  await expect(page.getByRole("button", { name: "1.362.954 inimest" })).toBeVisible();
  await expect(page.getByRole("button", { name: "1.403.518 inimest" })).toBeVisible();
});

test("Giving wrong answer informs you the answer was wrong.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.403.518 inimest" }).click();

  await expect(page.getByText("Oi, tundub et see oli vale vastus. Kuid pole vaja häbeneda, jätka vastamast.")).toBeVisible();
});

test("Giving right answer informs you the answer was right.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.362.954 inimest" }).click();

  await expect(page.getByText("Tubli töö. Oled andnud õige vastuse.")).toBeVisible();
});

test("Table is displayed after answering all questions.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.362.954 inimest" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "618 euro võrra" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "Ida-Virumaa" }).click();
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Küsimus:" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Õige vastus:" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Sinu vastus:" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Mis on Eesti rahvaarv 2026. aasta alguse seisuga?" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "2025. aastal on keskmine brutopalk tõusnud arvuni 2092 eurot kuus. Mitme euro võrra on see suurem, kui oli aastal 2021?" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Viimase rahvastiku loenduse tulemusena selgus, et protsentides väljendatud oli vanurite, ehk 65+ vanuserühmas inimeste, arv kõrgeim just selles maakonnas, kus see ületas 26.2%. Mis maakonnaga on tegemist?" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "1.362.954 inimest" }).nth(0)).toBeVisible();
  await expect(page.getByRole("cell", { name: "1.362.954 inimest" }).nth(1)).toBeVisible();
  await expect(page.getByRole("cell", { name: "618 euro võrra" }).nth(0)).toBeVisible();
  await expect(page.getByRole("cell", { name: "618 euro võrra" }).nth(1)).toBeVisible();
  await expect(page.getByRole("cell", { name: "Ida-Virumaa" }).nth(0)).toBeVisible();
  await expect(page.getByRole("cell", { name: "Ida-Virumaa" }).nth(1)).toBeVisible();
});

test("Message for answering 3/3 questions correctly exists.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.362.954 inimest" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "618 euro võrra" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "Ida-Virumaa" }).click();
  await page.getByRole("button").click();

  await expect(page.getByText("Sa oled vastanud igale küsimusele õigesti. Sinu teadmised Eesti statistikast on täiesti suurepärased.")).toBeVisible();
});

test("Message for answering 2/3 questions correctly exists.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.362.954 inimest" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "618 euro võrra" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "Hiiumaa" }).click();
  await page.getByRole("button").click();

  await expect(page.getByText("Sa oled õigesti vastanud kahele küsimusele kolmest. Sa tunned Eesti statistikat päris hästi, aga mõned väikesed aspektid ikka võivad sind tardumusse langetada.")).toBeVisible();
});

test("Message for answering 1/3 questions correctly exists.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.362.954 inimest" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "473 euro võrra" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "Hiiumaa" }).click();
  await page.getByRole("button").click();

  await expect(page.getByText("Sa oled andnud üks õige vastus kolmest. Sul on olemas alusteadmised Eesti statistikast, kuid sinu kasvupotentsiaal on veel suur.")).toBeVisible();
});

test("Message for answering 0/3 questions correctly exists.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button").click();
  await page.getByRole("button", { name: "1.257.980 inimest" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "473 euro võrra" }).click();
  await page.getByRole("button").click();
  await page.getByRole("button", { name: "Hiiumaa" }).click();
  await page.getByRole("button").click();

  await expect(page.getByText("Sa ei ole andnud ühtegi õiget vastust. Pead veel palju vaeva nägema, et ennast Eesti statistikaga kurssi viima.")).toBeVisible();
});
