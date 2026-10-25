class Solution:
    def removeCoveredIntervals(self, intervals: list[list[int]]) -> int:
        intervals.sort(key=lambda x: (x[0], -x[1]))
        count = 0
        max_end = 0
        for start, end in intervals:
            if end > max_end:
                count += 1
                max_end = end
        return count

def test():
    sol = Solution()
    assert sol.removeCoveredIntervals([[1,4],[3,6],[2,8]]) == 2, "test 1 failed"
    assert sol.removeCoveredIntervals([[1,4],[2,3]]) == 1, "test 2 failed"
    print("✓ remove-covered-intervals passed")

if __name__ == "__main__":
    test()
