from collections import Counter

class Solution:
    def recoverArray(self, nums: list[int]) -> list[int]:
        nums.sort()
        n = len(nums) // 2

        for i in range(1, 2 * n):
            diff = nums[i] - nums[0]
            if diff == 0 or diff % 2 != 0:
                continue

            k = diff // 2
            counts = Counter(nums)
            original = []

            for x in nums:
                if counts[x] == 0:
                    continue
                if counts[x + diff] == 0:
                    break
                counts[x] -= 1
                counts[x + diff] -= 1
                original.append(x + k)

            if len(original) == n:
                return original

        return []
