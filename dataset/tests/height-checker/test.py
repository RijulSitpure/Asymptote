from typing import List

class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        expected = sorted(heights)
        return sum(h1 != h2 for h1, h2 in zip(heights, expected))

def test():
    sol = Solution()
    assert sol.heightChecker([1,1,4,2,1,3]) == 3, "test 1 failed"
    assert sol.heightChecker([5,1,2,3,4]) == 5, "test 2 failed"
    assert sol.heightChecker([1,2,3,4,5]) == 0, "test 3 failed"
    print("✓ height-checker passed")

if __name__ == "__main__":
    test()
