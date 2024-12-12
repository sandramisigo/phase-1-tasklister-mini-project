// Select the form and tasks list elements
const taskForm = document.getElementById('create-task-form');
const taskList = document.getElementById('tasks');
const sortButton = document.getElementById('sort-tasks');

// Function to handle task creation
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskDescription = document.getElementById('new-task-description').value;
  const user = document.getElementById('user').value;
  const priority = document.getElementById('priority').value;

  if (taskDescription) {
    // Create a new list item
    const li = document.createElement('li');
    li.classList.add(priority); // Set the class based on priority

    // Create the task text and append it to the list item
    const taskText = document.createElement('span');
    taskText.textContent = `${taskDescription} (Assigned to: ${user})`;
    li.appendChild(taskText);

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
      li.remove();
    });

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function() {
      document.getElementById('new-task-description').value = taskDescription;
      document.getElementById('user').value = user;
      document.getElementById('priority').value = priority;
      li.remove(); // Remove task to allow editing
    });

    // Append the delete and edit buttons to the task list item
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    // Append the new task item to the tasks list
    taskList.appendChild(li);

    // Clear input fields
    document.getElementById('new-task-description').value = '';
    document.getElementById('user').value = '';
    document.getElementById('priority').value = 'high';
  }
});

// Sort tasks by priority
sortButton.addEventListener('click', function() {
  const tasks = Array.from(taskList.children);
  tasks.sort((a, b) => {
    const priorityA = a.classList[0];
    const priorityB = b.classList[0];

    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  // Re-append sorted tasks to the list
  tasks.forEach(task => taskList.appendChild(task));
});
