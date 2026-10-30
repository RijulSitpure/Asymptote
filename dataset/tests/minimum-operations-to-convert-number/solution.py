from collections import deque

class Solution:
    def minimumOperations(self, nums: list[int], start: int, goal: int) -> int:
        visited = set()
        visited.add(start)
        q = deque([(start, 0)])

        while q:
            curr, steps = q.popleft()
            if curr == goal:
                return steps

            for num in nums:
                for nxt in (curr + num, curr - num, curr ^ num):
                    if nxt == goal:
                        return steps + 1
                    if 0 <= nxt <= 1000 and nxt not in visited:
                        visited.add(nxt)
                        q.append((nxt, steps + 1))

        return -1
