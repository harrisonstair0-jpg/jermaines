import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders Jermaine’s café page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jermaine’s \| Eat\. Drink\. Love\./i);
  assert.match(html, /class="hero-word[^>]*">Eat\.<\/span>/i);
  assert.match(html, /class="hero-word[^>]*">Drink\.<\/span>/i);
  assert.match(html, /class="hero-word[^>]*">Love\.<\/span>/i);
  assert.match(html, /281\+ Google reviews/i);
  assert.match(html, /728 N Main St/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /CafeOrCoffeeShop/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the finished site free of starter-only files and metadata", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /restaurantSchema/);
  assert.match(page, /MotionConfig|AnimatePresence/);
  assert.match(page, /menuThemes/);
  assert.match(page, /ingredient-row/);
  assert.doesNotMatch(page, /Photo placeholder/);
  assert.match(page, /tel:\+19706419876/);
  assert.match(layout, /Jermaine’s \| Eat\. Drink\. Love\./);
  assert.match(layout, /ice cream Gunnison/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview|_sites-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /framer-motion/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
