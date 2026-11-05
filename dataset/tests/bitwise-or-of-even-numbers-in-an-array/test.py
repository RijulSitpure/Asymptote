from typing import List

class Solution:
    def bitwiseOrOfEven(self, nums: List[int]) -> int:
        ans = 0
        for x in nums:
            if x % 2 == 0:
                ans |= x
        return ans

def run_tests():
    sol = Solution()
    assert sol.bitwiseOrOfEven([1, 2, 4, 7]) == 6 # 2 | 4 = 6
    assert sol.bitwiseOrOfEven([1, 3, 5]) == 0 # no even numbers
    assert sol.bitwiseOrOfEven([2, 2, 2]) == 2
    print("All tests passed for 3688.")

if __name__ == "__main__":
    run_tests()
