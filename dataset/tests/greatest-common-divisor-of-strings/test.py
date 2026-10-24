import math

class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        if str1 + str2 != str2 + str1:
            return ""
        g = math.gcd(len(str1), len(str2))
        return str1[:g]

def test():
    sol = Solution()
    assert sol.gcdOfStrings("ABCABC", "ABC") == "ABC", "test 1 failed"
    assert sol.gcdOfStrings("ABABAB", "ABAB") == "AB", "test 2 failed"
    assert sol.gcdOfStrings("LEET", "CODE") == "", "test 3 failed"
    print("✓ greatest-common-divisor-of-strings passed")

if __name__ == "__main__":
    test()
