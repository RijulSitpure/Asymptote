from typing import List

class Solution:
    def fairCandySwap(self, aliceSizes: List[int], bobSizes: List[int]) -> List[int]:
        delta = (sum(bobSizes) - sum(aliceSizes)) // 2
        bob_set = set(bobSizes)
        for x in aliceSizes:
            if x + delta in bob_set:
                return [x, x + delta]
        return []

def test():
    sol = Solution()
    assert sol.fairCandySwap([1, 1], [2, 2]) == [1, 2], "test 1 failed"
    assert sol.fairCandySwap([1, 2], [2, 3]) == [1, 2], "test 2 failed"
    assert sol.fairCandySwap([2], [1, 3]) == [2, 3], "test 3 failed"
    print("✓ fair-candy-swap passed")

if __name__ == "__main__":
    test()
