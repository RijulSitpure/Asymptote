import math

class Solution:
    def countVowelStrings(self, n: int) -> int:
        return math.comb(n + 4, 4)

def test():
    sol = Solution()
    assert sol.countVowelStrings(1) == 5
    assert sol.countVowelStrings(2) == 15
    assert sol.countVowelStrings(33) == 66045

    print("✓ count-sorted-vowel-strings passed")

if __name__ == '__main__':
    test()
