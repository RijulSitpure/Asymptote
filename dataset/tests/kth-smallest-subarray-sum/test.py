class Solution:
    def kthSmallestSubarraySum(self, nums: list[int], k: int) -> int:
        low = min(nums)
        high = sum(nums)

        def count_le(target):
            count = 0
            curr = 0
            left = 0
            for right in range(len(nums)):
                curr += nums[right]
                while curr > target:
                    curr -= nums[left]
                    left += 1
                count += (right - left + 1)
            return count

        ans = high
        while low <= high:
            mid = (low + high) // 2
            if count_le(mid) >= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test_kth_smallest_subarray_sum():
    sol = Solution()
    assert sol.kthSmallestSubarraySum([2, 1, 3], 4) == 3
    assert sol.kthSmallestSubarraySum([3, 3, 5, 5], 7) == 10

