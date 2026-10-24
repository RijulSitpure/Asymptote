class Solution:
    def canConvert(self, str1: str, str2: str) -> bool:
        if str1 == str2:
            return True
        mapping = {}
        for c1, c2 in zip(str1, str2):
            if c1 in mapping and mapping[c1] != c2:
                return False
            mapping[c1] = c2
        return len(set(str2)) < 26

def test():
    sol = Solution()
    assert sol.canConvert("aabcc", "ccdee") is True, "test 1 failed"
    assert sol.canConvert("leetcode", "codeleet") is False, "test 2 failed"
    print("✓ string-transforms-into-another-string passed")

if __name__ == "__main__":
    test()
