class Solution:
    def makeArrayPositive(self, nums: list[int]) -> int:
        l = -1
        ans = pre_mx = s = 0
        for r, x in enumerate(nums):
            s += x
            if r - l > 2 and s <= pre_mx:
                ans += 1
                l = r
                s = nums[r]
                pre_mx = 0
            else:
                pre_mx = min(pre_mx, s)
        return ans

def run_tests():
    s = Solution()
    assert s.makeArrayPositive([-1, -2, -3, 4, 5]) == 1
    assert s.makeArrayPositive([1, 2, 3, 4]) == 0
    print("All tests passed for make-a-positive-array")

if __name__ == '__main__':
    run_tests()
