from collections import deque, Counter

class FirstUnique:
    def __init__(self, nums: list[int]):
        self.counts = Counter(nums)
        self.q = deque(nums)

    def showFirstUnique(self) -> int:
        while self.q and self.counts[self.q[0]] > 1:
            self.q.popleft()
        return self.q[0] if self.q else -1

    def add(self, value: int) -> None:
        self.counts[value] += 1
        self.q.append(value)

fu = FirstUnique([2,3,5])
assert fu.showFirstUnique() == 2
fu.add(5)
assert fu.showFirstUnique() == 2
fu.add(2)
assert fu.showFirstUnique() == 3
fu.add(3)
assert fu.showFirstUnique() == -1
print("All tests passed successfully.")
