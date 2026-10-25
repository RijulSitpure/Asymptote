class Solution:
    def arraySign(self, nums: list[int]) -> int:
        neg = 0
        for x in nums:
            if x == 0:
                return 0
            if x < 0:
                neg += 1
        return -1 if neg % 2 == 1 else 1

def test():
    sol = Solution()
    assert sol.arraySign([-1,-2,-3,-4,3,2,1]) == 1
    assert sol.arraySign([1,5,0,2,-3]) == 0
    assert sol.arraySign([-1,1,-1,1,-1]) == -1

if __name__ == '__main__':
    test()
