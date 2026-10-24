class Solution:
    def maxAbsValExpr(self, arr1: list[int], arr2: list[int]) -> int:
        res = 0
        for p in (1, -1):
            for q in (1, -1):
                vals = [arr1[i] * p + arr2[i] * q + i for i in range(len(arr1))]
                res = max(res, max(vals) - min(vals))
        return res

def test():
    sol = Solution()
    assert sol.maxAbsValExpr([1,2,3,4], [-1,4,5,6]) == 13, "test 1 failed"
    assert sol.maxAbsValExpr([1,-2,-5,0,10], [0,-2,-1,-7,-4]) == 20, "test 2 failed"
    print("✓ maximum-of-absolute-value-expression passed")

if __name__ == "__main__":
    test()
