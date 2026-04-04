### Practice Problem — Stage 1 (Core State & Component Thinking)

#### **Problem: Build a Dynamic Task Manager (Local State Only)**

Create a small “thick-client style” task manager using only React local state (no external state libraries).

---

### **Requirements**

#### 1. Task Creation

* User can add a task with:

  * Title (required)
  * Description (optional)
  * Priority (Low, Medium, High)
* Validate inputs (e.g., empty title should not be allowed)

---

#### 2. Task List

* Display all tasks in a list
* Each task should show:

  * Title
  * Priority
  * Status (Active / Completed)

---

#### 3. Task State Management

* Allow:

  * Mark task as completed
  * Edit task (inline or modal)
  * Delete task

---

#### 4. Derived State (Important)

* Show:

  * Total tasks
  * Completed tasks count
  * Remaining tasks count
* Do **not** store these separately — derive them from state

---

#### 5. Filtering & UI State

* Add filters:

  * All / Active / Completed
* Add sorting:

  * By priority
  * By creation time
* Manage UI state cleanly (selected filter, sort option)

---

#### 6. Component Structure (Important)

Break into components like:

* `TaskApp` (root)
* `TaskInput`
* `TaskList`
* `TaskItem`
* `TaskFilters`

---

### **Constraints**

* Use only:

  * `useState`
  * `useReducer` (optional but recommended)
* No external libraries (Redux, Zustand, etc.)
* Keep state normalized and minimal

---

### **What This Tests**

* Thinking in state vs UI
* State normalization (avoid duplication)
* Lifting state up vs localizing state
* Derived data vs stored data
* Component boundaries

---

### **Stretch Goals (Optional)**

* Persist tasks in `localStorage`
* Add undo for delete
* Add optimistic UI for edits
* Keyboard shortcuts (e.g., Enter to add task)

---

### **Expected Outcome**

After completing this, you should be able to:

* Design state shape intentionally
* Avoid redundant state
* Structure components around data flow
* Handle multiple UI interactions cleanly

---

If needed, a follow-up can include:

* Ideal state shape review
* Common mistakes in this problem
* A senior-level solution breakdown
