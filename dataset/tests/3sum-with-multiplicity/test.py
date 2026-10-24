from typing import List
from collections import Counter

class Solution:
    def threeSumMulti(self, arr: List[int], target: int) -> int:
        MOD = 1_000_000_007
        c = Counter(arr)
        ans = 0
        for i in range(101):
            for j in range(i, 101):
                k = target - i - j
                if k < j or k > 100:
                    continue
                if i == j == k:
                    ans = (ans + c[i] * (c[i] - 1) * (c[i] - 2) // 6) % MOD
                elif i == j != k:
                    ans = (ans + c[i] * (c[i] - 1) // 2 * c[k]) % MOD
                elif i != j == k:
                    ans = (ans + c[i] * c[j] * (c[j] - 1) // 2) % MOD
                else:
                    ans = (ans + c[i] * c[j] * c[k]) % MOD
        return ans

def test():
    sol = Solution()
    assert sol.threeSumMulti([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8) == 20, "test 1 failed"
    assert sol.threeSumMulti([1, 1, 2, 2, 2, 2], 5) == 12, "test 2 failed"
    print("✓ 3sum-with-multiplicity passed")

if __name__ == "__main__":
    test()
