from collections import Counter

class Solution:
    def minSwaps(self, nums: list[int], forbidden: list[int]) -> int:
        n = len(nums)
        conflicts = [nums[i] for i in range(n) if nums[i] == forbidden[i]]
        k = len(conflicts)
        if k == 0:
            return 0
        
        counts = Counter(conflicts)
        max_freq = max(counts.values())
        return max((k + 1) // 2, max_freq)

def run_tests():
    sol = Solution()
    assert sol.minSwaps([1, 2], [1, 2]) == 1 # 2 conflicts of different values -> 1 swap resolves both
    assert sol.minSwaps([1, 2], [2, 1]) == 0
    assert sol.minSwaps([1, 1, 3], [1, 1, 2]) == 2 # 2 conflicts of '1' -> needs 2 swaps
    print("All tests passed for 3785.")

if __name__ == "__main__":
    run_tests()
