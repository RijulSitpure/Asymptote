class Solution:
    def countMajoritySubarrays(self, nums: list[int], target: int) -> int:
        # Transform: target -> +1, others -> -1
        # Subarray has target as majority iff sum > 0
        n = len(nums)
        ans = 0
        for i in range(n):
            cur = 0
            for j in range(i, n):
                cur += 1 if nums[j] == target else -1
                if cur > 0:
                    ans += 1
        return ans

def run_tests():
    sol = Solution()
    assert sol.countMajoritySubarrays([1, 2, 2, 3], 2) == 5 # [2], [2], [2,2], [1,2,2], [2,2,3]
    assert sol.countMajoritySubarrays([1, 1, 1], 1) == 6 # all 6 subarrays
    assert sol.countMajoritySubarrays([3, 4, 5], 1) == 0
    print("All tests passed for 3737.")

if __name__ == "__main__":
    run_tests()