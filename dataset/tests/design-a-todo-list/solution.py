class TodoList:
    def __init__(self):
        self.task_id = 0
        self.tasks = {}
        self.user_tasks = {}
    def addTask(self, userId: int, taskDescription: str, dueDate: int, tags: list[str]) -> int:
        self.task_id += 1
        tid = self.task_id
        task = {
            'id': tid,
            'user': userId,
            'desc': taskDescription,
            'due': dueDate,
            'tags': set(tags),
            'done': False
        }
        self.tasks[tid] = task
        if userId not in self.user_tasks:
            self.user_tasks[userId] = []
        self.user_tasks[userId].append(tid)
        return tid
    def getAllTasks(self, userId: int) -> list[str]:
        if userId not in self.user_tasks:
            return []
        active = [self.tasks[tid] for tid in self.user_tasks[userId] if not self.tasks[tid]['done']]
        active.sort(key=lambda t: t['due'])
        return [t['desc'] for t in active]
    def getTasksForTag(self, userId: int, tag: str) -> list[str]:
        if userId not in self.user_tasks:
            return []
        active = [self.tasks[tid] for tid in self.user_tasks[userId] if not self.tasks[tid]['done'] and tag in self.tasks[tid]['tags']]
        active.sort(key=lambda t: t['due'])
        return [t['desc'] for t in active]
    def completeTask(self, userId: int, taskId: int) -> None:
        if taskId in self.tasks and self.tasks[taskId]['user'] == userId:
            self.tasks[taskId]['done'] = True
