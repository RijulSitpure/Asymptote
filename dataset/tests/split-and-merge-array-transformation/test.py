from collections import deque
from typing import List

class Solution:
    def minOperations(self, nums: List[int], target: List[int]) -> int:
        if nums == target:
            return 0
        if sum(nums) != sum(target):
            return -1
        start = tuple(nums)
        goal = tuple(target)
        queue = deque([(start, 0)])
        visited = {start}
        while queue:
            curr, steps = queue.popleft()
            if curr == goal:
                return steps
            if steps >= 6:
                continue
            for i in range(len(curr) - 1):
                merged = curr[:i] + (curr[i] + curr[i + 1],) + curr[i + 2:]
                if merged not in visited:
                    visited.add(merged)
                    queue.append((merged, steps + 1))
            for i in range(len(curr)):
                if curr[i] > 1:
                    for part in range(1, curr[i]):
                        split_arr = curr[:i] + (part, curr[i] - part) + curr[i + 1:]
                        if split_arr not in visited and len(split_arr) <= len(target) + 2:
                            visited.add(split_arr)
                            queue.append((split_arr, steps + 1))
        return -1

def run_tests():
    sol = Solution()
    assert sol.minOperations([2, 3], [5]) == 1 # 1 merge
    assert sol.minOperations([5], [2, 3]) == 1 # 1 split
    assert sol.minOperations([1, 2], [1, 2]) == 0
    assert sol.minOperations([1], [2]) == -1
    print("All tests passed for 3690.")

if __name__ == "__main__":
    run_tests()
