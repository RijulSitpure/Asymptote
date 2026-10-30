class Solution:
    def findMaximums(self, nums: list[int]) -> list[int]:
        n = len(nums)
        left = [-1] * n
        right = [n] * n
        
        stk = []
        for i in range(n):
            while stk and nums[stk[-1]] >= nums[i]:
                stk.pop()
            if stk:
                left[i] = stk[-1]
            stk.append(i)
            
        stk = []
        for i in range(n - 1, -1, -1):
            while stk and nums[stk[-1]] >= nums[i]:
                stk.pop()
            if stk:
                right[i] = stk[-1]
            stk.append(i)
            
        ans = [0] * (n + 1)
        for i in range(n):
            length = right[i] - left[i] - 1
            ans[length] = max(ans[length], nums[i])
            
        for k in range(n - 1, 0, -1):
            ans[k] = max(ans[k], ans[k + 1])
            
        return ans[1:]

def test_find_maximums():
    sol = Solution()
    assert sol.findMaximums([0, 1, 2, 4]) == [4, 2, 1, 0]
    assert sol.findMaximums([10, 20, 50, 10]) == [50, 20, 10, 10]

