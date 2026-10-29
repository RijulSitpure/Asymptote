import heapq

class DinnerPlates:
    def __init__(self, capacity: int):
        self.c = capacity
        self.stacks = []
        self.available = []

    def push(self, val: int) -> None:
        while self.available and self.available[0] < len(self.stacks) and len(self.stacks[self.available[0]]) == self.c:
            heapq.heappop(self.available)
        if not self.available:
            heapq.heappush(self.available, len(self.stacks))
            self.stacks.append([])
        idx = self.available[0]
        self.stacks[idx].append(val)
        if len(self.stacks[idx]) == self.c:
            heapq.heappop(self.available)

    def pop(self) -> int:
        while self.stacks and not self.stacks[-1]:
            self.stacks.pop()
        if not self.stacks:
            return -1
        return self.popAtStack(len(self.stacks) - 1)

    def popAtStack(self, index: int) -> int:
        if index >= len(self.stacks) or not self.stacks[index]:
            return -1
        if len(self.stacks[index]) == self.c:
            heapq.heappush(self.available, index)
        return self.stacks[index].pop()

D = DinnerPlates(2)
D.push(1)
D.push(2)
D.push(3)
D.push(4)
D.push(5)
assert D.popAtStack(0) == 2
D.push(20)
D.push(21)
assert D.popAtStack(0) == 20
assert D.popAtStack(2) == 21
assert D.pop() == 5
assert D.pop() == 4
assert D.pop() == 3
assert D.pop() == 1
assert D.pop() == -1
print("All tests passed successfully.")
