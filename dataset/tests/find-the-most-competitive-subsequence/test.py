class Solution:
    def mostCompetitive(self, nums: list[int], k: int) -> list[int]:
        stack = []
        n = len(nums)
        for i, x in enumerate(nums):
            while stack and stack[-1] > x and len(stack) + (n - i) > k:
                stack.pop()
            if len(stack) < k:
                stack.append(x)
        return stack

def test():
    sol = Solution()
    assert sol.mostCompetitive([3,5,2,6], 2) == [2,6]
    assert sol.mostCompetitive([2,4,3,3,5,4,9,6], 4) == [2,3,3,4]

    print("✓ find-the-most-competitive-subsequence passed")

if __name__ == '__main__':
    test()
