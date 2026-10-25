class Solution:
    def checkPowersOfThree(self, n: int) -> bool:
        while n > 0:
            if n % 3 == 2:
                return False
            n //= 3
        return True

def test():
    sol = Solution()
    assert sol.checkPowersOfThree(12) == True
    assert sol.checkPowersOfThree(91) == True
    assert sol.checkPowersOfThree(21) == False

    print("✓ check-if-number-is-a-sum-of-powers-of-three passed")

if __name__ == '__main__':
    test()
