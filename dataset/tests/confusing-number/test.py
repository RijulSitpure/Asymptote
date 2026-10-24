class Solution:
    def confusingNumber(self, n: int) -> bool:
        mapping = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
        orig = n
        rotated = 0
        while n > 0:
            digit = n % 10
            if digit not in mapping:
                return False
            rotated = rotated * 10 + mapping[digit]
            n //= 10
        return rotated != orig

def test():
    sol = Solution()
    assert sol.confusingNumber(6) == True, "test 1 failed"
    assert sol.confusingNumber(89) == True, "test 2 failed"
    assert sol.confusingNumber(11) == False, "test 3 failed"
    assert sol.confusingNumber(25) == False, "test 4 failed"
    print("✓ confusing-number passed")

if __name__ == "__main__":
    test()
