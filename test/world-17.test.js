import { html, fixture, expect } from '@open-wc/testing';
import "../world-17.js";

describe("world17 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <world-17
        title="title"
      ></world-17>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
