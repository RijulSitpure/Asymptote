class Solution:
    def maxSumMinProduct(self, nums: list[int]) -> int:
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]

        left = [-1] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            if stack:
                left[i] = stack[-1]
            stack.append(i)

        right = [n] * n
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            if stack:
                right[i] = stack[-1]
            stack.append(i)

        ans = 0
        for i in range(n):
            l = left[i] + 1
            r = right[i] - 1
            total_sum = pref[r + 1] - pref[l]
            ans = max(ans, nums[i] * total_sum)

        return ans % (10**9 + 7)

def test():
    sol = Solution()
    assert sol.maxSumMinProduct([1,2,3,2]) == 14
    assert sol.maxSumMinProduct([2,3,3,1,2]) == 18
    assert sol.maxSumMinProduct([3,1,5,6,4,2]) == 60

if __name__ == '__main__':
    test()
