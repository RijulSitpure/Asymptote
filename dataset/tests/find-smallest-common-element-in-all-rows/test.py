import bisect

class Solution:
    def smallestCommonElement(self, mat: list[list[int]]) -> int:
        m, n = len(mat), len(mat[0])
        for val in mat[0]:
            found = True
            for r in range(1, m):
                idx = bisect.bisect_left(mat[r], val)
                if idx == n or mat[r][idx] != val:
                    found = False
                    break
            if found:
                return val
        return -1

def test():
    sol = Solution()
    assert sol.smallestCommonElement([
        [1, 2, 3, 4, 5],
        [2, 4, 5, 8, 10],
        [3, 5, 7, 9, 11],
        [1, 3, 5, 7, 9]
    ]) == 5, "test 1 failed"
    assert sol.smallestCommonElement([
        [1, 2, 3],
        [2, 3, 4],
        [2, 3, 5]
    ]) == 2, "test 2 failed"
    print("✓ find-smallest-common-element-in-all-rows passed")

if __name__ == "__main__":
    test()
