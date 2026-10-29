import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'smallest-rotation-with-highest-score.json')

class Solution:
    def bestRotation(self, nums: list[int]) -> int:
        n = len(nums)
        diff = [0] * n
        for i, val in enumerate(nums):
            low = (i + 1) % n
            high = (i - val + n + 1) % n
            diff[low] += 1
            diff[high] -= 1
            if low >= high:
                diff[0] += 1
        best_k = 0
        max_score = -1
        curr = 0
        for k in range(n):
            curr += diff[k]
            if curr > max_score:
                max_score = curr
                best_k = k
        return best_k

sol = Solution()
assert sol.bestRotation([2, 3, 1, 4, 0]) == 3
assert sol.bestRotation([1, 3, 0, 2, 4]) == 0
print("✓ smallest-rotation-with-highest-score passed")
