from typing import List

class Solution:
    def minOperations(self, nums: List[int]) -> int:
        ans = 0
        stack = [0]
        for num in nums:
            while stack and stack[-1] > num:
                stack.pop()
            if not stack or stack[-1] < num:
                ans += 1
                stack.append(num)
        return ans

def run_tests():
    s = Solution()
    res = s.minOperations([1, 2, 1])
    assert res == 2, f"Expected 2, got {res}"
    print("3542 minimum-operations-to-convert-all-elements-to-zero PASSED")

if __name__ == "__main__":
    run_tests()
