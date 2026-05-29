(function () {
  emailjs.init(CONFIG.PUBLIC_KEY);
})();

const form = document.getElementById("contact-form");

const submitBtn = form.querySelector("button");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    time: new Date().toLocaleString(),
  };

  // BUTTON LOADING
  submitBtn.disabled = true;

  const originalText = submitBtn.innerText;

  submitBtn.innerText = "Sending...";

  // LOADING ALERT
  Swal.fire({
    title: "Sending Message",
    text: "Please wait while your message is being delivered.",
    allowOutsideClick: false,
    showConfirmButton: false,

    customClass: {
      popup: "swal-popup",
      title: "swal-title",
      htmlContainer: "swal-text",
    },

    didOpen: () => {
      Swal.showLoading();
    },
  });

  // SEND EMAIL
  emailjs
    .send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, data)

    .then(function () {
      Swal.fire({
        icon: "success",

        title: "Message Sent Successfully",

        text: "Thank you for reaching out. I’ll get back to you soon.",

        timer: 2600,

        showConfirmButton: false,

        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
        },
      });

      form.reset();
    })

    .catch(function (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Failed To Send",

        text: "Something went wrong. Please try again later.",

        confirmButtonText: "Try Again",

        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm",
        },
      });
    })

    .finally(() => {
      submitBtn.disabled = false;

      submitBtn.innerText = originalText;
    });
});