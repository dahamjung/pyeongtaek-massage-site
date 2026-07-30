const SITE_CONFIG = {
  phone: "0507-1859-8915",
  sms: "0507-1859-8915",
  smsMessage: "사이트 보고 문의드립니다:) ",
  businessName: "상호명 입력",
  domain: "https://dahamjung.github.io/pyeongtaek-massage-site/"
};

(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const primaryNav = document.querySelector("[data-nav]");
  const statusRegion = document.getElementById("site-status");
  const mobileBreakpoint = window.matchMedia("(max-width: 979px)");

  const digitsOnly = (value) => value.replace(/[^0-9+]/g, "");
  const isPlaceholderPhone = (value) => /^010-?0{4}-?0{4}$/.test(value);
  const normalizedDomain = (() => {
    try {
      const url = new URL(SITE_CONFIG.domain);
      url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
      url.search = "";
      url.hash = "";
      return url.href;
    } catch (_error) {
      return "https://dahamjung.github.io/pyeongtaek-massage-site/";
    }
  })();
  const normalizedPageUrl = (() => {
    const pagePath = (document.documentElement.dataset.pagePath || "/").replace(/^\/+/, "");
    try {
      return new URL(pagePath, normalizedDomain).href;
    } catch (_error) {
      return normalizedDomain;
    }
  })();

  function announce(message) {
    if (!statusRegion) return;
    statusRegion.textContent = "";
    window.setTimeout(() => {
      statusRegion.textContent = message;
    }, 30);
  }

  function configureContactLinks() {
    const phoneHref = `tel:${digitsOnly(SITE_CONFIG.phone)}`;
    const smsSeparator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? "&" : "?";
    const smsHref = `sms:${digitsOnly(SITE_CONFIG.sms)}${smsSeparator}body=${encodeURIComponent(SITE_CONFIG.smsMessage)}`;

    document.querySelectorAll('[data-action="phone-click"]').forEach((link) => {
      link.setAttribute("href", phoneHref);
    });

    document.querySelectorAll('[data-action="sms-click"]').forEach((link) => {
      link.setAttribute("href", smsHref);
    });

    document.querySelectorAll("[data-config-phone]").forEach((element) => {
      element.textContent = SITE_CONFIG.phone;
    });

    document.querySelectorAll("[data-config-business]").forEach((element) => {
      element.textContent = SITE_CONFIG.businessName;
    });
  }

  function configureSeoMetadata() {
    const metadata = {
      'link[rel="canonical"]': normalizedPageUrl,
      'link[rel="alternate"][hreflang="ko-KR"]': normalizedPageUrl,
      'meta[property="og:url"]': normalizedPageUrl,
      'meta[property="og:image"]': `${normalizedDomain}images/hero.webp`,
      'meta[name="twitter:image"]': `${normalizedDomain}images/hero.webp`
    };

    Object.entries(metadata).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (!element) return;
      if (element.tagName === "LINK") element.setAttribute("href", value);
      if (element.tagName === "META") element.setAttribute("content", value);
    });

    const jsonLd = document.getElementById("structured-data");
    if (!jsonLd) return;

    try {
      const data = JSON.parse(jsonLd.textContent);
      const graph = data["@graph"] || [];
      const idBase = normalizedDomain;

      graph.forEach((item) => {
        if (typeof item["@id"] === "string") {
          item["@id"] = item["@id"].replace(/^https:\/\/[^/]+\//, idBase);
        }
        if (typeof item.url === "string") {
          item.url = ["Organization", "WebSite"].includes(item["@type"])
            ? normalizedDomain
            : normalizedPageUrl;
        }

        if (item["@type"] === "Organization") {
          item.name = SITE_CONFIG.businessName;
          item.telephone = SITE_CONFIG.phone;
        }

        if (item.publisher && item.publisher["@id"]) {
          item.publisher["@id"] = `${idBase}#organization`;
        }
        if (item.provider && item.provider["@id"]) {
          item.provider["@id"] = `${idBase}#organization`;
        }
      });

      jsonLd.textContent = JSON.stringify(data);
    } catch (_error) {
      announce("구조화 데이터 설정을 확인해 주세요.");
    }
  }

  function setMenu(open) {
    if (!menuButton || !primaryNav) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    primaryNav.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open && mobileBreakpoint.matches);
  }

  if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
      const nextState = menuButton.getAttribute("aria-expanded") !== "true";
      setMenu(nextState);
      if (nextState) primaryNav.querySelector("a")?.focus();
    });

    primaryNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || menuButton.getAttribute("aria-expanded") !== "true") return;
      setMenu(false);
      menuButton.focus();
    });

    mobileBreakpoint.addEventListener("change", () => setMenu(false));
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    const isAccordionKey = (event) => ["Enter", " ", "Space", "Spacebar"].includes(event.key);

    accordion.addEventListener("keydown", (event) => {
      if (!event.target.closest("summary") || !isAccordionKey(event)) return;
      event.preventDefault();
    });

    accordion.addEventListener("keyup", (event) => {
      const summary = event.target.closest("summary");
      if (!summary || !isAccordionKey(event)) return;

      event.preventDefault();
      const item = summary.parentElement;
      if (item instanceof HTMLDetailsElement) item.open = !item.open;
    });

    accordion.addEventListener("toggle", (event) => {
      const opened = event.target;
      if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
      accordion.querySelectorAll("details[open]").forEach((item) => {
        if (item !== opened) item.open = false;
      });
    }, true);
  }

  function openLegalHash() {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (target instanceof HTMLDetailsElement) target.open = true;
  }

  window.addEventListener("hashchange", openLegalHash);
  openLegalHash();

  document.addEventListener("click", (event) => {
    const actionLink = event.target.closest("[data-action]");
    if (!actionLink) return;

    const action = actionLink.dataset.action;
    const course = actionLink.dataset.course || null;
    const detail = { action, course, timestamp: Date.now() };

    document.dispatchEvent(new CustomEvent("site:cta-click", { detail }));
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: action, course });
    }

    if (action === "phone-click" && isPlaceholderPhone(SITE_CONFIG.phone)) {
      event.preventDefault();
      announce("운영 전화번호를 설정한 뒤 전화 상담을 이용할 수 있습니다.");
    }

    if (action === "sms-click" && isPlaceholderPhone(SITE_CONFIG.sms)) {
      event.preventDefault();
      announce("운영 문자번호를 설정한 뒤 문자 예약을 이용할 수 있습니다.");
    }
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  configureContactLinks();
  configureSeoMetadata();
})();
