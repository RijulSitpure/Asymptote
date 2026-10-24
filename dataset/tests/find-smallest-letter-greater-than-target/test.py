import sys
from typing import List

class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        low, high = 0, len(letters)
        while low < high:
            mid = (low + high) // 2
            if letters[mid] <= target:
                low = mid + 1
            else:
                high = mid
        return letters[low % len(letters)]

def test():
    sol = Solution()
    assert sol.nextGreatestLetter(["c", "f", "j"], "a") == "c", "test 1 failed"
    assert sol.nextGreatestLetter(["c", "f", "j"], "c") == "f", "test 2 failed"
    assert sol.nextGreatestLetter(["x", "x", "y", "y"], "z") == "x", "test 3 failed"
    print("✓ find-smallest-letter-greater-than-target passed")

if __name__ == "__main__":
    test()
