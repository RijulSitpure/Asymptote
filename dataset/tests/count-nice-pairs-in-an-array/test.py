from collections import Counter

class Solution:
    def countNicePairs(self, nums: list[int]) -> int:
        def rev(x: int) -> int:
            return int(str(x)[::-1])

        MOD = 10**9 + 7
        counts = Counter(x - rev(x) for x in nums)
        return sum(c * (c - 1) // 2 for c in counts.values()) % MOD

def test():
    sol = Solution()
    assert sol.countNicePairs([42,11,1,97]) == 2
    assert sol.countNicePairs([13,10,35,24,76]) == 4

if __name__ == '__main__':
    test()
