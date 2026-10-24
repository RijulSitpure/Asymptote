from typing import List

class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        cols = len(strs[0])
        dp = [1] * cols
        for i in range(cols):
            for j in range(i):
                if all(s[j] <= s[i] for s in strs):
                    dp[i] = max(dp[i], dp[j] + 1)
        return cols - max(dp)

def test():
    sol = Solution()
    assert sol.minDeletionSize(["babca","bbazb"]) == 3, "test 1 failed"
    assert sol.minDeletionSize(["edcba"]) == 4, "test 2 failed"
    assert sol.minDeletionSize(["ghi","def","abc"]) == 0, "test 3 failed"
    print("✓ delete-columns-to-make-sorted-iii passed")

if __name__ == "__main__":
    test()
