export function teamFilters(): void {
  // Get all radio fields and the "all" button
  const radioFields = document.querySelectorAll(
    '.equipe_filters_radio_field, .actualites_filters_radio_field'
  );
  const allButton = document.querySelector(
    '.equipe_filters_button-all, .actualites_filters_button-all'
  );

  if (!allButton) return;

  // Function to check active state and update the "all" button
  const updateAllButtonState = (): void => {
    // Check if any radio field has the active class
    const hasActiveField = Array.from(radioFields).some((field) =>
      field.classList.contains('is-active-inputactive')
    );

    // Update the "all" button class based on active fields
    if (hasActiveField) {
      allButton.classList.remove('is-active');
    } else {
      allButton.classList.add('is-active');
    }
  };

  // Initial check
  updateAllButtonState();

  // Set up mutation observer to watch for class changes on radio fields
  const observer = new MutationObserver(updateAllButtonState);

  // Observe each radio field for class changes
  radioFields.forEach((field) => {
    observer.observe(field, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });
}
