from typing import List

class Solution:
    def maxXorSubsequence(self, nums: List[int]) -> int:
        basis = [0] * 32
        for x in nums:
            val = x
            for i in range(31, -1, -1):
                if (val >> i) & 1:
                    if not basis[i]:
                        basis[i] = val
                        break
                    val ^= basis[i]
        max_xor = 0
        for i in range(31, -1, -1):
            if (max_xor ^ basis[i]) > max_xor:
                max_xor ^= basis[i]
        return max_xor

def run_tests():
    sol = Solution()
    assert sol.maxXorSubsequence([3, 2, 4, 6]) == 7 # 3 ^ 4 = 7
    assert sol.maxXorSubsequence([1, 2, 4]) == 7 # 1 ^ 2 ^ 4 = 7
    assert sol.maxXorSubsequence([5]) == 5
    print("All tests passed for 3681.")

if __name__ == "__main__":
    run_tests()
