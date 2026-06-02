document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticketForm');
    const typeSelect = document.getElementById('type');
    const studentField = document.getElementById('studentField');
    const guestField = document.getElementById('guestField');
    const studentIdInput = document.getElementById('studentId');
    const accessCodeInput = document.getElementById('accessCode');
    const errorContainer = document.getElementById('errorContainer');
    const errorList = document.getElementById('errorList');
    const successContainer = document.getElementById('successContainer');

    // Hidden conditional fields based on Type selection
    typeSelect.addEventListener('change', () => {
        const selectedType = typeSelect.value;

        // Hide both fields initially
        studentField.classList.add('hidden');
        guestField.classList.add('hidden');

        // Make both not required initially
        studentIdInput.required = false;
        accessCodeInput.required = false;

        if (selectedType === 'student') {
            studentField.classList.remove('hidden');
            studentIdInput.required = true;
        } else if (selectedType === 'guest') {
            guestField.classList.remove('hidden');
            accessCodeInput.required = true;
        }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous error messages
        errorList.innerHTML = '';
        errorContainer.classList.add('hidden');
        successContainer.classList.add('hidden');

        const errors = [];

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const type = typeSelect.value;
        const eventDateValue = document.getElementById('eventDate').value;
        const studentId = studentIdInput.value.trim();
        const accessCode = accessCodeInput.value.trim();

        // Basic required field validation
        if (!firstName) errors.push('First Name is required.');
        if (!lastName) errors.push('Last Name is required.');
        if (!email) errors.push('Email is required.');
        if (!type) errors.push('Please select a Type (Student or Guest).');
        if (!eventDateValue) errors.push('Event Date is required.');

        // Date validation - must be in the future
        if (eventDateValue) {
            const selectedDate = new Date(eventDateValue);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to compare dates only

            if (selectedDate <= today) {
                errors.push('Event Date must be a future date.');
            }
        }

        // Validate type specific fields
        if (type === 'student') {
            if (!studentId) {
                errors.push('Student I# is required.');
            } else if (!/^\d{9}$/.test(studentId)) {
                errors.push('Student I# must be 9 digits.');
            }
        }

        if (type === 'guest') {
            if (!accessCode) {
                errors.push('Access Code is required.');
            } else if (accessCode !== 'EVENT131') {
                errors.push('Access Code is not valid.');
            }
        }

        // Display errors at bottom of form
        if (errors.length > 0) {
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                errorList.appendChild(li);
            });
            errorContainer.classList.remove('hidden');
            return;
        }

        // Display success message
        document.getElementById('successName').textContent = `${firstName} ${lastName}`;
        document.getElementById('successType').textContent = type;
        document.getElementById('successDate').textContent = eventDateValue;

        successContainer.classList.remove('hidden');
    });
});