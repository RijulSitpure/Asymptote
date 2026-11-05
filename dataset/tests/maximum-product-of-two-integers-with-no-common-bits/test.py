from typing import List

class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        unique_nums = sorted(list(set(nums)), reverse=True)
        best = 0
        n = len(unique_nums)
        for i in range(n):
            a = unique_nums[i]
            if a * a <= best:
                break
            for j in range(i + 1, n):
                b = unique_nums[j]
                if (a & b) == 0:
                    best = max(best, a * b)
                    break
        return best

def run_tests():
    sol = Solution()
    assert sol.maxProduct([1, 2, 4, 8]) == 32 # 4 * 8 = 32
    assert sol.maxProduct([3, 5, 6, 7]) == 0 # no disjoint pairs (all share bits)
    assert sol.maxProduct([1, 6, 8]) == 48 # 6 (110) & 8 (1000) = 0 -> 48
    print("All tests passed for 3670.")

if __name__ == "__main__":
    run_tests()
