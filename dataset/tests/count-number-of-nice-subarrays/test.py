from collections import Counter

class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        count = Counter({0: 1})
        cur = 0
        ans = 0
        for x in nums:
            cur += x % 2
            ans += count[cur - k]
            count[cur] += 1
        return ans

def test():
    sol = Solution()
    assert sol.numberOfSubarrays([1, 1, 2, 1, 1], 3) == 2, "test 1 failed"
    assert sol.numberOfSubarrays([2, 4, 6], 1) == 0, "test 2 failed"
    assert sol.numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2) == 16, "test 3 failed"
    print("✓ count-number-of-nice-subarrays passed")

if __name__ == "__main__":
    test()
