from typing import List
from collections import Counter

class Solution:
    def onceTwice(self, nums: List[int]) -> List[int]:
        counts = Counter(nums)
        return sorted([val for val, freq in counts.items() if freq == 1])

def run_tests():
    s = Solution()
    res1 = s.onceTwice([1, 2, 1, 3, 2, 5])
    assert res1 == [3, 5], f"Expected [3, 5], got {res1}"
    res2 = s.onceTwice([4, 4, 7])
    assert res2 == [7], f"Expected [7], got {res2}"
    print("3595 once-twice PASSED")

if __name__ == "__main__":
    run_tests()
