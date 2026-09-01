document.addEventListener("DOMContentLoaded", function () {
  function populateCountryDropdowns(countries) {
    if (!Array.isArray(countries) || countries.length === 0) return;

    document
      .querySelectorAll('select[name="country"], select[name="popup-country"]')
      .forEach((sel) => {
        sel.innerHTML = "";
        let selectedValue = null;

        countries.forEach((item) => {
          const name = item.name || item.mame;
          const code = item.callingCode || "";
          if (!name) return;

          const opt = document.createElement("option");
          opt.value = name;
          opt.setAttribute("data-code", code);
          opt.textContent = `${name.toUpperCase()} ${code}`;
          opt.className = "text-slate-800 bg-white";

          if (name.trim().toLowerCase() === "india") {
            opt.selected = true;
            selectedValue = name;
          }
          sel.appendChild(opt);
        });

        if (selectedValue) {
          sel.value = selectedValue;
        }
        sel.dispatchEvent(new Event("change"));
      });
  }

  // Load from countries.json or api.php
  fetch("countries.json")
    .then((res) => {
      if (!res.ok) throw new Error("countries.json failed");
      return res.json();
    })
    .then((data) => {
      populateCountryDropdowns(data);
    })
    .catch(() => {
      // Fallback to api.php
      fetch("api.php?t=" + new Date().getTime())
        .then((res) => {
          if (!res.ok) throw new Error("api.php failed");
          return res.json();
        })
        .then((data) => {
          populateCountryDropdowns(data);
        })
        .catch((err) => {
          console.warn("Could not load full country list dynamically, using default:", err);
          document
            .querySelectorAll('select[name="country"], select[name="popup-country"]')
            .forEach((sel) => {
              sel.innerHTML = '<option value="India" data-code="+91" selected class="text-slate-800 bg-white">INDIA +91</option>';
              sel.dispatchEvent(new Event("change"));
            });
        });
    });
});
