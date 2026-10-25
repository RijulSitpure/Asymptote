class Solution:
    def checkIfCanBreak(self, s1: str, s2: str) -> bool:
        a = sorted(s1)
        b = sorted(s2)
        return all(x >= y for x, y in zip(a, b)) or all(y >= x for x, y in zip(a, b))

def test():
    sol = Solution()
    assert sol.checkIfCanBreak("abc", "xya") == True, "test 1 failed"
    assert sol.checkIfCanBreak("abe", "acd") == False, "test 2 failed"
    assert sol.checkIfCanBreak("leetcodee", "interview") == True, "test 3 failed"
    print("✓ check-if-a-string-can-break-another-string passed")

if __name__ == "__main__":
    test()
