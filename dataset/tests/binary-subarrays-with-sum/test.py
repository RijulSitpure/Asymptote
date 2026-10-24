from typing import List

class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        def at_most(k: int) -> int:
            if k < 0:
                return 0
            left = 0
            curr = 0
            count = 0
            for right in range(len(nums)):
                curr += nums[right]
                while curr > k:
                    curr -= nums[left]
                    left += 1
                count += right - left + 1
            return count
        return at_most(goal) - at_most(goal - 1)

def test():
    sol = Solution()
    assert sol.numSubarraysWithSum([1,0,1,0,1], 2) == 4, "test 1 failed"
    assert sol.numSubarraysWithSum([0,0,0,0,0], 0) == 15, "test 2 failed"
    print("✓ binary-subarrays-with-sum passed")

if __name__ == "__main__":
    test()
