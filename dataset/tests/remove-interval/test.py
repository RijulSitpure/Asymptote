class Solution:
    def removeInterval(self, intervals: list[list[int]], toBeRemoved: list[int]) -> list[list[int]]:
        r_start, r_end = toBeRemoved
        res = []
        for start, end in intervals:
            if end <= r_start or start >= r_end:
                res.append([start, end])
            else:
                if start < r_start:
                    res.append([start, r_start])
                if end > r_end:
                    res.append([r_end, end])
        return res

def test():
    sol = Solution()
    assert sol.removeInterval([[0,2],[3,4],[5,7]], [1,6]) == [[0,1],[6,7]], "test 1 failed"
    assert sol.removeInterval([[0,5]], [2,3]) == [[0,2],[3,5]], "test 2 failed"
    print("✓ remove-interval passed")

if __name__ == "__main__":
    test()
