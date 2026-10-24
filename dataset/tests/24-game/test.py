from typing import List

class Solution:
    def judgePoint24(self, cards: List[int]) -> bool:
        EPS = 1e-5

        def dfs(nums: List[float]) -> bool:
            if len(nums) == 1:
                return abs(nums[0] - 24.0) < EPS
            n = len(nums)
            for i in range(n):
                for j in range(n):
                    if i == j:
                        continue
                    next_nums = [nums[k] for k in range(n) if k != i and k != j]
                    a, b = nums[i], nums[j]
                    candidates = [a + b, a - b, a * b]
                    if abs(b) > EPS:
                        candidates.append(a / b)
                    for cand in candidates:
                        next_nums.append(cand)
                        if dfs(next_nums):
                            return True
                        next_nums.pop()
            return False

        return dfs([float(c) for c in cards])

def test():
    sol = Solution()
    assert sol.judgePoint24([4, 1, 8, 7]) is True, "test 1 failed"
    assert sol.judgePoint24([1, 2, 1, 2]) is False, "test 2 failed"
    print("✓ 24-game passed")

if __name__ == "__main__":
    test()
