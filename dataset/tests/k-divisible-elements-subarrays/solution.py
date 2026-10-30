class Solution:
    def countDistinct(self, nums: list[int], k: int, p: int) -> int:
        root = {}
        count = 0
        n = len(nums)
        for i in range(n):
            curr = root
            div_count = 0
            for j in range(i, n):
                if nums[j] % p == 0:
                    div_count += 1
                if div_count > k:
                    break
                val = nums[j]
                if val not in curr:
                    curr[val] = {}
                    count += 1
                curr = curr[val]
        return count
