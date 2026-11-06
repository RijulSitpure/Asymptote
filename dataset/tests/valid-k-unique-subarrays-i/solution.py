def countSubarraysWithKUnique(nums: list[int], k: int) -> int:
    def atMost(m: int) -> int:
        if m <= 0:
            return 0
        freq = {}
        left = 0
        ans = 0
        for right, x in enumerate(nums):
            freq[x] = freq.get(x, 0) + 1
            while len(freq) > m:
                freq[nums[left]] -= 1
                if freq[nums[left]] == 0:
                    del freq[nums[left]]
                left += 1
            ans += right - left + 1
        return ans

    return atMost(k) - atMost(k - 1)