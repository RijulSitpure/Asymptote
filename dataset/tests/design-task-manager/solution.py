import heapq

class TaskManager:
    def __init__(self, tasks: list[list[int]]):
        self.task_map = {}
        self.pq = []
        for user_id, task_id, priority in tasks:
            self.add(user_id, task_id, priority)

    def add(self, userId: int, taskId: int, priority: int) -> None:
        self.task_map[taskId] = (userId, priority)
        heapq.heappush(self.pq, (-priority, -taskId, userId))

    def edit(self, taskId: int, newPriority: int) -> None:
        if taskId in self.task_map:
            user_id, _ = self.task_map[taskId]
            self.task_map[taskId] = (user_id, newPriority)
            heapq.heappush(self.pq, (-newPriority, -taskId, user_id))

    def rmv(self, taskId: int) -> None:
        if taskId in self.task_map:
            del self.task_map[taskId]

    def execTop(self) -> int:
        while self.pq:
            neg_p, neg_t, user_id = heapq.heappop(self.pq)
            task_id = -neg_t
            priority = -neg_p
            if task_id in self.task_map and self.task_map[task_id] == (user_id, priority):
                del self.task_map[task_id]
                return user_id
        return -1
