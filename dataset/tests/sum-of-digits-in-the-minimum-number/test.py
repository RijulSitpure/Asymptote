from typing import List

class Solution:
    def sumOfDigits(self, nums: List[int]) -> int:
        m = min(nums)
        digit_sum = 0
        while m > 0:
            digit_sum += m % 10
            m //= 10
        return 1 if digit_sum % 2 == 0 else 0

def test():
    sol = Solution()
    assert sol.sumOfDigits([34,23,1,24,75,33,54,8]) == 0, "test 1 failed"
    assert sol.sumOfDigits([99,77,33,66,55]) == 1, "test 2 failed"
    print("✓ sum-of-digits-in-the-minimum-number passed")

if __name__ == "__main__":
    test()
