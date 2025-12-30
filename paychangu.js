function makePayment() {
  const button = document.getElementById("start-payment-button");

  if (!button) return;

  const originalHTML = button.innerHTML;

  // Lock button
  button.disabled = true;
  button.classList.add("opacity-60", "cursor-not-allowed");
  button.innerHTML = `
    <div class="flex items-center justify-center gap-3">
      <div class="h-5 w-5 border-2 border-[#0e0e0e] border-t-transparent rounded-full animate-spin"></div>
      <span class="text-sm tracking-wide">Processing payment…</span>
    </div>
  `;

  const txRef = `MWK_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  try {
    PaychanguCheckout({
      public_key: "PUB-TEST-lOoOFNXdED3z7eXNlD7Di7MgillQd78c",
      tx_ref: txRef,
      amount: 50,
      currency: "MWK",
      callback_url: "https://ericlyndert.com/verify",
      return_url: "",
      customer: {
        email: "hello@ericlyndert.com",
        first_name: "Lyndert",
        last_name: "Manani",
      },
      customization: {
        title: "Test Payment",
        description: "Payment Description",
      },
      meta: {
        uuid: "uuid",
        response: "Response",
      },
      onClose: () => {
        resetButton();
        showToast("Payment was cancelled. You can try again.");
      }
    });
  } catch (err) {
    console.error(err);
    resetButton();
    showToast("Unable to start payment. Please try again.");
  }

  // Safety reset (10s)
  setTimeout(() => {
    if (!button.disabled) return;
    resetButton();
    showToast("Payment is taking longer than expected.");
  }, 10000);

  function resetButton() {
    button.disabled = false;
    button.classList.remove("opacity-60", "cursor-not-allowed");
    button.innerHTML = originalHTML;
  }
}
