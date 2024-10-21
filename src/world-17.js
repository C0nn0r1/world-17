/**
 * Copyright 2024 C0nn0r1
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class World17 extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "world-17";
  }

  constructor() {
    super();
    this.title = "";
    this.currentGoal = 1; // Default goal to display in the random slot
    this.colorOnly = false; // Initialize the color-only property
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Sustainable Development Goals",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/world-17.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentGoal: { type: Number }, // Tracks the current random goal displayed
      colorOnly: { type: Boolean }, // Tracks if the color-only representation is enabled
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(--world-17-label-font-size, var(--ddd-font-size-s));
        }
        .goal {
          display: flex;
          align-items: center;
          margin-bottom: var(--ddd-spacing-2);
        }
        .goal img {
          width: 100px;
          height: 100px;
          margin-right: var(--ddd-spacing-2);
        }
        .goal .color-square {
          width: 100px;
          height: 100px;
          margin-right: var(--ddd-spacing-2);
        }
        .random-button {
          display: block;
          margin-top: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-1);
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        .random-button:hover {
          background-color: #0056b3;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span> ${this.title}</h3>

        <!-- Random Goal Slot (Color-Only) -->
        <div class="goal">
          <div
            class="color-square"
            style="background-color: var(--un-sdg-goal-${this.currentGoal})"
            ?hidden="${!this.colorOnly}"
          ></div>
          <a
            href="${this.getGoalLink(this.currentGoal)}"
            target="_blank"
            class="image-slot"
            ?hidden="${this.colorOnly}"
          >
            <img
              src="../lib/svgs/Sustainable_Development_Goal_${this.currentGoal}.svg"
              alt="Goal ${this.currentGoal}"
              loading="lazy" 
            />
            <span>Goal ${this.currentGoal}</span>
          </a>
        </div>

        <!-- Randomize Buttons -->
        <button class="random-button" @click="${this.randomizeGoal}">
          Randomize Goal
        </button>
        <button class="random-button" @click="${this.toggleColorOnly}">
          ${this.colorOnly ? "Show Image" : "Show Color Only"}
        </button>

        <!-- Render All Goals -->
        ${this.renderGoals()}
      </div>
    `;
  }

  renderGoals() {
    const goals = [
      { number: 1, title: "No Poverty", link: "https://sdgs.un.org/goals/goal1" },
      { number: 2, title: "Zero Hunger", link: "https://sdgs.un.org/goals/goal2" },
      { number: 3, title: "Good Health", link: "https://sdgs.un.org/goals/goal3" },
      { number: 4, title: "Quality Education", link: "https://sdgs.un.org/goals/goal4" },
      { number: 5, title: "Gender Equality", link: "https://sdgs.un.org/goals/goal5" },
      { number: 6, title: "Clean Water and Sanitation", link: "https://sdgs.un.org/goals/goal6" },
      { number: 7, title: "Affordable and Clean Energy", link: "https://sdgs.un.org/goals/goal7" },
      { number: 8, title: "Decent Work and Economic Growth", link: "https://sdgs.un.org/goals/goal8" },
      { number: 9, title: "Industry, Innovation and Infrastructure", link: "https://sdgs.un.org/goals/goal9" },
      { number: 10, title: "Reduced Inequalities", link: "https://sdgs.un.org/goals/goal10" },
      { number: 11, title: "Sustainable Cities and Communities", link: "https://sdgs.un.org/goals/goal11" },
      { number: 12, title: "Responsible Consumption and Production", link: "https://sdgs.un.org/goals/goal12" },
      { number: 13, title: "Climate Action", link: "https://sdgs.un.org/goals/goal13" },
      { number: 14, title: "Life Below Water", link: "https://sdgs.un.org/goals/goal14" },
      { number: 15, title: "Life on Land", link: "https://sdgs.un.org/goals/goal15" },
      { number: 16, title: "Peace, Justice and Strong Institutions", link: "https://sdgs.un.org/goals/goal16" },
      { number: 17, title: "Partnerships for the Goals", link: "https://sdgs.un.org/goals/goal17" },
    ];

    return goals.map(
      (goal) => html`
        <div class="goal">
          <a href="${goal.link}" target="_blank" class="image-slot">
            <img
              src="../lib/svgs/Sustainable_Development_Goal_${goal.number}.svg"
              alt="${goal.title}"
              loading="lazy"
            />
            <span>${goal.title}</span>
          </a>
        </div>
      `
    );
  }

  getGoalLink(goalNumber) {
    return `https://sdgs.un.org/goals/goal${goalNumber}`;
  }

  randomizeGoal() {
    const randomGoal = Math.floor(Math.random() * 17) + 1;
    this.currentGoal = randomGoal;
  }

  toggleColorOnly() {
    this.colorOnly = !this.colorOnly; // Toggle between image and color-only display
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

customElements.define(World17.tag, World17);
