class Solution:
    def minInversions(self, nums: list[int], k: int) -> int:
        n = len(nums)
        if k <= 1:
            return 0
        
        ans = float('inf')
        for i in range(n - k + 1):
            sub = nums[i:i + k]
            inv = 0
            for a in range(k):
                for b in range(a + 1, k):
                    if sub[a] > sub[b]:
                        inv += 1
            ans = min(ans, inv)
        return ans

def run_tests():
    sol = Solution()
    assert sol.minInversions([3, 1, 2, 4], 3) == 0 # [1, 2, 4] has 0 inversions
    assert sol.minInversions([5, 4, 3, 2, 1], 3) == 3 # any 3 decreasing elements has 3 inversions
    print("All tests passed for 3768.")

if __name__ == "__main__":
    run_tests()
