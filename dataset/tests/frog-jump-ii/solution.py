class Solution:
    def maxJump(self, stones: list[int]) -> int:
        if len(stones) == 2:
            return stones[1] - stones[0]
        ans = stones[1] - stones[0]
        for i in range(2, len(stones)):
            step = stones[i] - stones[i - 2]
            if step > ans:
                ans = step
        return ans
