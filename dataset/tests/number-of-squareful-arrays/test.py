from typing import List
import math

class Solution:
    def numSquarefulPerms(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        visited = [False] * n

        def is_square(x: int) -> bool:
            r = int(math.isqrt(x))
            return r * r == x

        def dfs(last: int, count: int) -> int:
            if count == n:
                return 1
            total = 0
            for i in range(n):
                if visited[i]:
                    continue
                if i > 0 and nums[i] == nums[i - 1] and not visited[i - 1]:
                    continue
                if last is not None and not is_square(last + nums[i]):
                    continue
                visited[i] = True
                total += dfs(nums[i], count + 1)
                visited[i] = False
            return total

        return dfs(None, 0)

def test():
    sol = Solution()
    assert sol.numSquarefulPerms([1,17,8]) == 2, "test 1 failed"
    assert sol.numSquarefulPerms([2,2,2]) == 1, "test 2 failed"
    print("✓ number-of-squareful-arrays passed")

if __name__ == "__main__":
    test()
