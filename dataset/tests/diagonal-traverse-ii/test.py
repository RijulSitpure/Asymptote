from collections import defaultdict

class Solution:
    def findDiagonalOrder(self, nums: list[list[int]]) -> list[int]:
        diags = defaultdict(list)
        for r, row in enumerate(nums):
            for c, val in enumerate(row):
                diags[r + c].append(val)
        res = []
        for k in range(len(diags)):
            res.extend(reversed(diags[k]))
        return res

def test():
    sol = Solution()
    assert sol.findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]]) == [1,4,2,7,5,3,8,6,9], "test 1 failed"
    assert sol.findDiagonalOrder([[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]) == [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16], "test 2 failed"
    print("✓ diagonal-traverse-ii passed")

if __name__ == "__main__":
    test()
