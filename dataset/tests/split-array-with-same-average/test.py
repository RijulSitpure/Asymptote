from typing import List

class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n = len(nums)
        total = sum(nums)
        if n == 1:
            return False

        transformed = [n * x - total for x in nums]
        mid = n // 2
        left_half = transformed[:mid]
        right_half = transformed[mid:]

        left_sums = {0}
        for x in left_half:
            left_sums |= {s + x for s in left_sums}

        right_sums = {0}
        for x in right_half:
            right_sums |= {s + x for s in right_sums}

        total_left = sum(left_half)
        total_right = sum(right_half)

        left_sums.discard(0)
        left_sums.discard(total_left)
        if 0 in left_sums:
            return True

        if 0 in {s for s in right_sums if s != 0 and s != total_right}:
            return True

        for s in left_sums:
            if -s in right_sums:
                return True

        return False

def test():
    sol = Solution()
    assert sol.splitArraySameAverage([1, 2, 3, 4, 5, 6, 7, 8]) is True, "test 1 failed"
    assert sol.splitArraySameAverage([3, 1]) is False, "test 2 failed"
    print("✓ split-array-with-same-average passed")

if __name__ == "__main__":
    test()
