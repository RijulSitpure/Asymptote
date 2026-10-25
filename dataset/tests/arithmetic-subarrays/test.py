class Solution:
    def checkArithmeticSubarrays(self, nums: list[int], l: list[int], r: list[int]) -> list[bool]:
        ans = []
        for left, right in zip(l, r):
            sub = sorted(nums[left : right + 1])
            diff = sub[1] - sub[0]
            ok = True
            for i in range(2, len(sub)):
                if sub[i] - sub[i - 1] != diff:
                    ok = False
                    break
            ans.append(ok)
        return ans

def test():
    sol = Solution()
    assert sol.checkArithmeticSubarrays([4,6,5,9,3,7], [0,0,2], [2,3,5]) == [True, False, True]
    assert sol.checkArithmeticSubarrays([-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], [0,1,6,4,8,7], [4,4,9,7,9,10]) == [False, True, False, False, True, True]

    print("✓ arithmetic-subarrays passed")

if __name__ == '__main__':
    test()
