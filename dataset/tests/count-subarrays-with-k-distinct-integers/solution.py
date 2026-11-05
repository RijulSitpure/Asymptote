from collections import Counter

def subarraysWithKDistinct(nums: list[int], k: int) -> int:
    def atMost(m: int) -> int:
        if m == 0:
            return 0
        count = Counter()
        left = 0
        ans = 0
        for right, x in enumerate(nums):
            if count[x] == 0:
                m -= 1
            count[x] += 1
            while m < 0:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    m += 1
                left += 1
            ans += (right - left + 1)
        return ans

    return atMost(k) - atMost(k - 1)