window.APP_CONFIG = {
  GOOGLE_CLIENT_ID: "249334657422-s56311g3fa78mnjm579htcjispb6f0h4.apps.googleusercontent.com",

  GOOGLE_SHEET_ID: "1NUY3EMJvh3JdGIMEa8j9LQjtVihVcUspHYLwpmuc_YQ",

  GOOGLE_SHEET_RANGE: "'總表'!A:Q"
};

// Ensure elements using the HTML `hidden` attribute are actually removed
// from layout, even when a component class sets its own display value.
(() => {
  const style = document.createElement("style");
  style.textContent = "[hidden]{display:none!important}";
  document.head.appendChild(style);

  document.addEventListener("DOMContentLoaded", () => {
    const loginGate = document.getElementById("loginGate");
    if (!loginGate) return;

    const resetScrollWhenHidden = () => {
      if (loginGate.hidden) {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        });
      }
    };

    resetScrollWhenHidden();
    new MutationObserver(resetScrollWhenHidden).observe(loginGate, {
      attributes: true,
      attributeFilter: ["hidden"]
    });
  });
})();
