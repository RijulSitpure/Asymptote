from typing import List

class Solution:
    def canCross(self, stones: List[int]) -> bool:
        stone_set = set(stones)
        dp = {s: set() for s in stones}
        dp[0].add(0)

        for s in stones:
            for jump in dp[s]:
                for step in (jump - 1, jump, jump + 1):
                    if step > 0 and (s + step) in stone_set:
                        dp[s + step].add(step)

        return len(dp[stones[-1]]) > 0

def test():
    sol = Solution()
    assert sol.canCross([0,1,3,5,6,8,12,17]) == True, "test 1 failed"
    assert sol.canCross([0,1,2,3,4,8,9,11]) == False, "test 2 failed"
    print("✓ frog-jump passed")

if __name__ == "__main__":
    test()
