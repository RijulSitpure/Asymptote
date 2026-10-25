class Solution:
    def areAlmostEqual(self, s1: str, s2: str) -> bool:
        diffs = [i for i in range(len(s1)) if s1[i] != s2[i]]
        if len(diffs) == 0:
            return True
        if len(diffs) == 2:
            i, j = diffs
            return s1[i] == s2[j] and s1[j] == s2[i]
        return False

def test():
    sol = Solution()
    assert sol.areAlmostEqual("bank", "kanb") == True
    assert sol.areAlmostEqual("attack", "defend") == False
    assert sol.areAlmostEqual("kelb", "kelb") == True

    print("✓ check-if-one-string-swap-can-make-strings-equal passed")

if __name__ == '__main__':
    test()
