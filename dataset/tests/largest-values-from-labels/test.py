from typing import List
from collections import defaultdict

class Solution:
    def largestValsFromLabels(self, values: List[int], labels: List[int], numWanted: int, useLimit: int) -> int:
        items = sorted(zip(values, labels), key=lambda x: -x[0])
        label_counts = defaultdict(int)
        total = 0
        taken = 0
        for v, l in items:
            if label_counts[l] < useLimit:
                total += v
                label_counts[l] += 1
                taken += 1
                if taken == numWanted:
                    break
        return total

def test():
    sol = Solution()
    assert sol.largestValsFromLabels([5,4,3,2,1], [1,1,2,2,3], 3, 1) == 9, "test 1 failed"
    assert sol.largestValsFromLabels([5,4,3,2,1], [1,3,3,3,2], 3, 2) == 12, "test 2 failed"
    print("✓ largest-values-from-labels passed")

if __name__ == "__main__":
    test()
