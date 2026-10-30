class Solution:
    def minSwaps(self, s: str) -> int:
        mismatched = 0
        for c in s:
            if c == "[":
                mismatched += 1
            elif mismatched > 0:
                mismatched -= 1
        return (mismatched + 1) // 2

def test_min_swaps():
    sol = Solution()
    assert sol.minSwaps("][][") == 1
    assert sol.minSwaps("]]][[[") == 2
    assert sol.minSwaps("[]") == 0

