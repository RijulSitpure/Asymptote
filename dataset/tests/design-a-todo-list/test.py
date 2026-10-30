from solution import TodoList
todo = TodoList()
assert todo.addTask(1, 'Task1', 50, []) == 1
assert todo.addTask(1, 'Task2', 100, ['tag1']) == 2
assert todo.getAllTasks(1) == ['Task1', 'Task2']
assert todo.getAllTasks(5) == []
assert todo.addTask(1, 'Task3', 30, ['tag1']) == 3
assert todo.getTasksForTag(1, 'tag1') == ['Task3', 'Task2']
todo.completeTask(5, 1)
todo.completeTask(1, 2)
assert todo.getTasksForTag(1, 'tag1') == ['Task3']
assert todo.getAllTasks(1) == ['Task3', 'Task1']
print('All tests passed for design-a-todo-list!')
