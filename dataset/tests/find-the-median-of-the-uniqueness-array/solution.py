class Solution:
    def medianOfUniquenessArray(self, nums: list[int]) -> int:
        n = len(nums)
        total_subarrays = n * (n + 1) // 2
        target = (total_subarrays + 1) // 2

        def count_at_most(k):
            freq = {}
            left = 0
            cnt = 0
            for right, x in enumerate(nums):
                freq[x] = freq.get(x, 0) + 1
                while len(freq) > k:
                    freq[nums[left]] -= 1
                    if freq[nums[left]] == 0:
                        del freq[nums[left]]
                    left += 1
                cnt += (right - left + 1)
            return cnt

        low = 1
        high = n
        ans = n
        while low <= high:
            mid = (low + high) // 2
            if count_at_most(mid) >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans
