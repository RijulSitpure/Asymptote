class Solution:
    def generateTheString(self, n: int) -> str:
        if n % 2 == 1:
            return "a" * n
        return "a" * (n - 1) + "b"

def test():
    sol = Solution()
    assert sol.generateTheString(4) == "aaab", "test 1 failed"
    assert sol.generateTheString(2) == "ab", "test 2 failed"
    assert sol.generateTheString(7) == "aaaaaaa", "test 3 failed"
    print("✓ generate-a-string-with-characters-that-have-odd-counts passed")

if __name__ == "__main__":
    test()
