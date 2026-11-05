from collections import Counter
from typing import List

class Solution:
    def canPartition(self, nums: List[int], k: int) -> bool:
        n = len(nums)
        if n % k != 0:
            return False
        num_groups = n // k
        counts = Counter(nums)
        for val, freq in counts.items():
            if freq > num_groups:
                return False
        return True

def run_tests():
    sol = Solution()
    assert sol.canPartition([1, 2, 3, 4], 2) == True
    assert sol.canPartition([1, 1, 1, 2], 2) == False
    assert sol.canPartition([1, 2, 2, 3, 3, 4], 3) == True
    print("All tests passed for 3659.")

if __name__ == "__main__":
    run_tests()
