/* UI version: 1.0.0 */

(() => {
  "use strict";

  const MARKDOWN_PATH = "./05_rnaseq_workflow_fa/rnaseqGene_fa.md";
  const THEME_KEY = "rna-seq-reader-theme";

  const article = document.getElementById("article");
  const tocNav = document.getElementById("toc-nav");
  const tocPanel = document.getElementById("toc-panel");
  const tocToggle = document.getElementById("toc-toggle");
  const tocBackdrop = document.getElementById("toc-backdrop");
  const themeToggle = document.getElementById("theme-toggle");
  const progressBar = document.getElementById("reading-progress-bar");
  const backToTop = document.getElementById("back-to-top");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return prefersDark.matches ? "dark" : "light";
  }

  function setTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    if (persist) localStorage.setItem(THEME_KEY, theme);
  }

  setTheme(getInitialTheme());

  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next, true);
  });

  prefersDark.addEventListener?.("change", (event) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(event.matches ? "dark" : "light");
    }
  });

  function slugify(value, fallback) {
    const normalized = value
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "");
    return normalized || fallback;
  }

  function assignHeadingIds() {
    const seen = new Map();
    const headings = [...article.querySelectorAll("h1, h2, h3, h4, h5, h6")];

    headings.forEach((heading, index) => {
      const base = slugify(heading.textContent.trim(), `section-${index + 1}`);
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      heading.id = count ? `${base}-${count + 1}` : base;
    });

    return headings;
  }

  function styleDocumentHeader(headings) {
    const firstH1 = headings.find((heading) => heading.tagName === "H1");
    if (firstH1) {
      firstH1.classList.add("document-title");
      document.title = firstH1.textContent.trim();
    }

    const h4s = headings.filter((heading) => heading.tagName === "H4");
    if (h4s[0]) h4s[0].classList.add("document-meta");
    if (h4s[1]) h4s[1].classList.add("abstract-title");
  }

  function buildToc(headings) {
    tocNav.replaceChildren();

    const navHeadings = headings.filter((heading) => {
      if (!["H1", "H2", "H3"].includes(heading.tagName)) return false;
      if (heading.classList.contains("document-title")) return false;
      return heading.textContent.trim() !== "فهرست مطالب";
    });

    const fragment = document.createDocumentFragment();

    navHeadings.forEach((heading) => {
      const link = document.createElement("a");
      link.className = "toc-link";
      link.dataset.level = heading.tagName.slice(1);
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      link.addEventListener("click", closeToc);
      fragment.appendChild(link);
    });

    tocNav.appendChild(fragment);
    observeSections(navHeadings);
  }

  function observeSections(headings) {
    if (!("IntersectionObserver" in window) || !headings.length) return;

    const links = new Map(
      [...tocNav.querySelectorAll(".toc-link")].map((link) => [
        decodeURIComponent(link.hash.slice(1)),
        link,
      ])
    );

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        });

        const current = [...visible.values()]
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (!current) return;

        links.forEach((link) => link.classList.remove("is-active"));
        const active = links.get(current.target.id);
        active?.classList.add("is-active");
        active?.scrollIntoView({ block: "nearest" });
      },
      {
        rootMargin: "-18% 0px -72% 0px",
        threshold: [0, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));
  }

  async function copyText(value, button) {
    const original = button.textContent;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.textContent = "کپی شد";
    } catch {
      button.textContent = "ناموفق";
    }

    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  }

  function enhanceCodeBlocks() {
    const blocks = [...article.querySelectorAll("pre")];

    blocks.forEach((pre) => {
      if (pre.closest(".code-frame")) return;

      const code = pre.querySelector("code");
      const match = code?.className.match(/language-([\w-]+)/i);
      const label = match?.[1] || "Code";

      const frame = document.createElement("section");
      frame.className = "code-frame";

      const toolbar = document.createElement("div");
      toolbar.className = "code-toolbar";

      const codeLabel = document.createElement("span");
      codeLabel.className = "code-label";
      codeLabel.textContent = label;
      codeLabel.dir = "ltr";

      const actions = document.createElement("div");
      actions.className = "code-actions";

      const expandButton = document.createElement("button");
      expandButton.type = "button";
      expandButton.className = "code-action";
      expandButton.textContent = "باز کردن";
      expandButton.hidden = true;

      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "code-action";
      copyButton.textContent = "کپی";

      copyButton.addEventListener("click", () => {
        copyText(code?.textContent || pre.textContent, copyButton);
      });

      expandButton.addEventListener("click", () => {
        const expanded = frame.classList.toggle("is-expanded");
        expandButton.textContent = expanded ? "جمع کردن" : "باز کردن";
      });

      actions.append(expandButton, copyButton);
      toolbar.append(codeLabel, actions);

      const body = document.createElement("div");
      body.className = "code-body";

      pre.parentNode.insertBefore(frame, pre);
      body.appendChild(pre);
      frame.append(toolbar, body);

      requestAnimationFrame(() => {
        if (pre.scrollHeight > 440) {
          frame.classList.add("is-collapsible");
          expandButton.hidden = false;
        }
      });
    });
  }

  function enhanceTables() {
    [...article.querySelectorAll("table")].forEach((table) => {
      if (table.parentElement?.classList.contains("table-scroll")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function enhanceLinks() {
    [...article.querySelectorAll("a[href]")].forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  function openToc() {
    tocPanel?.classList.add("is-open");
    tocBackdrop.hidden = false;
    document.body.classList.add("toc-open");
    tocToggle?.setAttribute("aria-expanded", "true");
  }

  function closeToc() {
    tocPanel?.classList.remove("is-open");
    tocBackdrop.hidden = true;
    document.body.classList.remove("toc-open");
    tocToggle?.setAttribute("aria-expanded", "false");
  }

  tocToggle?.addEventListener("click", () => {
    if (tocPanel?.classList.contains("is-open")) closeToc();
    else openToc();
  });

  tocBackdrop?.addEventListener("click", closeToc);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeToc();
  });

  function updateScrollUI() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = documentHeight > 0 ? window.scrollY / documentHeight : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    backToTop?.classList.toggle("is-visible", window.scrollY > 700);
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("resize", updateScrollUI);

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  async function renderMarkdown() {
    try {
      if (!window.marked || !window.DOMPurify) {
        throw new Error("Markdown renderer dependencies are unavailable.");
      }

      const response = await fetch(MARKDOWN_PATH, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load Markdown: ${response.status}`);
      }

      const markdown = await response.text();
      const rendered = window.marked.parse(markdown, {
        gfm: true,
        breaks: false,
      });

      article.innerHTML = window.DOMPurify.sanitize(rendered, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ["dir"],
      });

      article.setAttribute("aria-busy", "false");

      const headings = assignHeadingIds();
      styleDocumentHeader(headings);
      buildToc(headings);
      enhanceCodeBlocks();
      enhanceTables();
      enhanceLinks();
      updateScrollUI();

      if (window.location.hash) {
        const target = document.getElementById(
          decodeURIComponent(window.location.hash.slice(1))
        );
        target?.scrollIntoView();
      }
    } catch (error) {
      console.error(error);
      article.setAttribute("aria-busy", "false");
      article.innerHTML =
        '<div class="error-state">فایل Markdown بارگذاری نشد. صفحه را از طریق یک وب‌سرور باز کنید.</div>';
    }
  }

  renderMarkdown();
})();
