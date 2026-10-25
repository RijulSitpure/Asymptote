class Solution:
    def getMaxLen(self, nums: list[int]) -> int:
        pos, neg = 0, 0
        ans = 0
        for x in nums:
            if x > 0:
                pos = pos + 1
                neg = neg + 1 if neg > 0 else 0
            elif x < 0:
                new_pos = neg + 1 if neg > 0 else 0
                new_neg = pos + 1
                pos, neg = new_pos, new_neg
            else:
                pos, neg = 0, 0
            ans = max(ans, pos)
        return ans

def test():
    sol = Solution()
    assert sol.getMaxLen([1,-2,-3,4]) == 4, "test 1 failed"
    assert sol.getMaxLen([0,1,-2,-3,-4]) == 3, "test 2 failed"
    assert sol.getMaxLen([-1,-2,-3,0,1]) == 2, "test 3 failed"
    print("✓ maximum-length-of-subarray-with-positive-product passed")

if __name__ == "__main__":
    test()
