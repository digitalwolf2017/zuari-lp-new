document.addEventListener("DOMContentLoaded", function () {
  function getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const keys = [
      "source",
      "Lead_source__c",
      "Tertiary_Source__c",
      "campaign",
      "chatConversation",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_adgroup",
      "utm_content",
      "utm_term",
      "utm_placement",
      "placement",
      "utm_device",
      "device"
    ];

    keys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        sessionStorage.setItem(key, val);
      }
    });

    const getVal = (primary, fallback) => {
      return (
        urlParams.get(primary) ||
        sessionStorage.getItem(primary) ||
        (fallback ? urlParams.get(fallback) || sessionStorage.getItem(fallback) : null) ||
        ""
      );
    };

    return {
      source: getVal("source"),
      leadSource: getVal("Lead_source__c"),
      tertiarySource: getVal("Tertiary_Source__c"),
      campaign: getVal("campaign"),
      chatConversation: getVal("chatConversation"),
      utmSource: getVal("utm_source"),
      utmMedium: getVal("utm_medium"),
      utmCampaign: getVal("utm_campaign"),
      utmAdgroup: getVal("utm_adgroup", "utm_content"),
      utmTerm: getVal("utm_term"),
      utmPlacment: getVal("utm_placement", "placement"),
      utmDevice: getVal("utm_device", "device")
    };
  }

  function initLeadForm(formOrId) {
    const form = typeof formOrId === "string" ? document.getElementById(formOrId) : formOrId;
    if (!form) return;

    const salutationSel = form.querySelector('select[name="salutation"]'),
      fullNameInput = form.querySelector('input[name="full-name"]'),
      countrySel = form.querySelector('select[name="country"], select[name="popup-country"]'),
      phoneInput = form.querySelector('input[name="phone"]'),
      phoneError = form.querySelector('[id*="phone-error"]'),
      whatsappCheck = form.querySelector('input[id*="whatsapp-check"], input[id*="modal-whatsapp"]'),
      whatsappField = form.querySelector('[id*="whatsapp-no-field"]'),
      whatsappInput = form.querySelector('input[name="whatsapp-no"]'),
      emailInput = form.querySelector('input[name="email"]'),
      prefTimeSel = form.querySelector('select[name="preferred-time"]'),
      consent1Check = form.querySelector('input[id*="consent-1"], input[id="terms"]'),
      consent2Check = form.querySelector('input[id*="consent-2"]'),
      submitBtn = form.querySelector('button[type="submit"]'),
      btnText = form.querySelector('[id*="btn-text"]'),
      btnLoader = form.querySelector('[id*="btn-loader"]');

    if (whatsappCheck && whatsappField && whatsappInput) {
      if (whatsappCheck.checked) {
        whatsappField.classList.add("hidden");
        whatsappInput.removeAttribute("required");
        if (phoneInput && phoneInput.value) {
          whatsappInput.value = phoneInput.value;
        }
      } else {
        whatsappField.classList.remove("hidden");
        whatsappInput.setAttribute("required", "required");
      }

      whatsappCheck.addEventListener("change", function () {
        if (this.checked) {
          whatsappField.classList.add("hidden");
          whatsappInput.value = phoneInput ? phoneInput.value : "";
          whatsappInput.removeAttribute("required");
        } else {
          whatsappField.classList.remove("hidden");
          whatsappInput.value = "";
          whatsappInput.setAttribute("required", "required");
        }
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        if (whatsappCheck && whatsappCheck.checked && whatsappInput) {
          whatsappInput.value = this.value;
        }
        if (phoneError) {
          if (this.value.length >= 7 && this.value.length <= 15) {
            phoneError.classList.add("hidden");
          }
        }
      });
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();

      const salutation = salutationSel ? salutationSel.value : "",
        fullName = fullNameInput ? fullNameInput.value.trim() : "",
        cCode = countrySel && countrySel.selectedIndex >= 0 ? (countrySel.options[countrySel.selectedIndex].getAttribute("data-code") || "") : "",
        country = cCode || (countrySel ? countrySel.value : ""),
        email = emailInput ? emailInput.value.trim() : "",
        phone = phoneInput ? phoneInput.value.trim() : "",
        whatsapp = (whatsappCheck && whatsappCheck.checked) ? phone : (whatsappInput ? whatsappInput.value.trim() : phone),
        prefTime = prefTimeSel ? prefTimeSel.value : "",
        c1 = consent1Check ? consent1Check.checked : true,
        c2 = consent2Check ? consent2Check.checked : true;

      let errs = [];

      if (salutationSel && !salutation) errs.push("Please select a salutation.");
      if (!fullName) errs.push("Please enter your full name.");
      if (!/^\S+@\S+\.\S+$/.test(email)) errs.push("Please enter a valid email address.");
      if (phone.length < 7 || phone.length > 15) {
        errs.push("Please enter a valid phone number (7-15 digits).");
        if (phoneError) phoneError.classList.remove("hidden");
      }
      if (whatsappCheck && !whatsappCheck.checked && (whatsapp.length < 7 || whatsapp.length > 15)) {
        errs.push("Please enter a valid WhatsApp number (7-15 digits).");
      }
      if (prefTimeSel && !prefTime) errs.push("Please select a preferred time to call.");
      if (!(c1 && c2)) errs.push("Please accept the terms and consent checkboxes.");

      if (errs.length > 0) {
        alert(errs.join("\n"));
        return;
      }

      const originalBtnText = btnText ? btnText.innerText : "Submit";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-80", "cursor-not-allowed");
      }
      if (btnText) btnText.innerText = "Submitting...";
      if (btnLoader) btnLoader.classList.remove("hidden");

      const utm = getUTMParams();

      const payload = {
        salutation: salutation,
        lastName: fullName,
        Country_Code__c: country,
        countryCode: cCode,
        secondaryCountryCode: cCode,
        mobile: phone,
        whatsappNumber: whatsapp,
        email: email,
        preferredTimeToCall: prefTime,
        source: utm.source || "Digital Marketing",
        Source_Type__c: "Digital Marketing",
        Lead_source__c: utm.leadSource,
        Tertiary_Source__c: utm.tertiarySource,
        campaign: utm.campaign,
        chatConversation: utm.chatConversation,
        subSource: "Zuari KinetiX LP",
        project: "Zuari KinetiX",
        sourceOfConsent: "Enquiry from Zuari KinetiX",
        consetStatus: true,
        utmSource: utm.utmSource,
        utmMedium: utm.utmMedium,
        utmCampaign: utm.utmCampaign,
        utmAdgroup: utm.utmAdgroup,
        utmTerm: utm.utmTerm,
        utmPlacment: utm.utmPlacment,
        utmDevice: utm.utmDevice
      };

      fetch("leads.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then((res) => {
          if (!res.ok) throw new Error("leads.php local failed");
          return res.json();
        })
        .then((data) => {
          if (data && data.success) {
            window.location.href = `thank-you.html?salutation=${encodeURIComponent(salutation || "Mr.")}&name=${encodeURIComponent(fullName)}`;
          } else {
            alert(data.message || "There was an issue submitting your request. Please try again.");
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
            }
            if (btnText) btnText.innerText = originalBtnText;
            if (btnLoader) btnLoader.classList.add("hidden");
          }
        })
        .catch(() => {
          // Fallback to direct database API
          fetch("https://apis.wbnarayanaschools.in/zuari-leads.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          })
            .then((res) => res.json())
            .then((data) => {
              if (data && data.success) {
                window.location.href = `thank-you.html?salutation=${encodeURIComponent(salutation || "Mr.")}&name=${encodeURIComponent(fullName)}`;
              } else {
                alert(data.message || "There was an issue submitting your request. Please try again.");
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
                }
                if (btnText) btnText.innerText = originalBtnText;
                if (btnLoader) btnLoader.classList.add("hidden");
              }
            })
            .catch((err) => {
              console.error("Submission error:", err);
              alert("Unable to submit form. Please check your network connection.");
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
              }
              if (btnText) btnText.innerText = originalBtnText;
              if (btnLoader) btnLoader.classList.add("hidden");
            });
        });
    });
  }

  // Initialize all lead forms on the page
  ["callback-form", "callback-form-2", "popup-form"].forEach(initLeadForm);
});
