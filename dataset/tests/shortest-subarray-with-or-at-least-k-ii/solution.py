class Solution:
    def minimumSubarrayLength(self, nums: list[int], k: int) -> int:
        bit_counts = [0] * 32

        def get_val():
            val = 0
            for b in range(32):
                if bit_counts[b] > 0:
                    val |= (1 << b)
            return val

        left = 0
        ans = float('inf')
        for right, num in enumerate(nums):
            for b in range(32):
                if (num >> b) & 1:
                    bit_counts[b] += 1
            while left <= right and get_val() >= k:
                ans = min(ans, right - left + 1)
                for b in range(32):
                    if (nums[left] >> b) & 1:
                        bit_counts[b] -= 1
                left += 1
        return ans if ans != float('inf') else -1
