import sys
from typing import List

class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        prefix = [0]
        for x in nums:
            prefix.append(prefix[-1] + x)

        def merge_sort(low: int, high: int) -> int:
            if high - low <= 1:
                return 0
            mid = (low + high) // 2
            count = merge_sort(low, mid) + merge_sort(mid, high)
            j = k = mid
            for i in range(low, mid):
                while j < high and prefix[j] - prefix[i] < lower:
                    j += 1
                while k < high and prefix[k] - prefix[i] <= upper:
                    k += 1
                count += k - j
            prefix[low:high] = sorted(prefix[low:high])
            return count

        return merge_sort(0, len(prefix))

def test():
    sol = Solution()
    assert sol.countRangeSum([-2, 5, -1], -2, 2) == 3, "test 1 failed"
    assert sol.countRangeSum([0], 0, 0) == 1, "test 2 failed"
    print("✓ count-of-range-sum passed")

if __name__ == "__main__":
    test()
