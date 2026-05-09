## Problem Statement: Multi-Step Form Builder (Wizard)

Build a **multi-step form (wizard)** that collects user information across multiple steps, validates inputs, and submits the final data.

---

## Requirements

### 1. Steps Structure

The form must have **at least 4 steps**:

1. **Personal Information**

   * First Name
   * Last Name
   * Email

2. **Account Details**

   * Username
   * Password
   * Confirm Password

3. **Profile Information**

   * Age
   * Phone Number
   * Country (dropdown)

4. **Review & Submit**

   * Show all entered data
   * Allow editing any step before submission

---

### 2. Navigation

* “Next” and “Back” buttons
* Cannot proceed to next step unless current step is valid
* User can navigate back without losing data
* Optional: Step indicator (e.g., Step 2 of 4)

---

### 3. Validation

* Field-level validation (required, format, etc.)
* Password and confirm password must match
* Email must be valid
* Show inline error messages

---

### 4. State Management

* All form data should persist across steps
* Centralized state (e.g., reducer or context)
* Avoid duplicating state across components

---

### 5. Submission

* Final step submits all data as a single object
* Show loading state during submission
* Show success or error message

---

### 6. UX Requirements

* Inputs should be controlled
* Disable “Next” button if invalid
* Preserve user input when navigating steps

---

### 7. Bonus (Optional but Valuable)

* Save progress in `localStorage`
* Allow user to resume form
* Add dynamic steps (e.g., conditionally show fields)
* Prevent unnecessary re-renders

---

## Expected Output

A fully functional multi-step form that:

* Maintains consistent state across steps
* Enforces validation correctly
* Provides smooth navigation and UX
* Submits structured data successfully
