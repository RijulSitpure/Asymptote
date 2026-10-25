class Solution:
    def checkOnesSegment(self, s: str) -> bool:
        return "01" not in s

def test():
    sol = Solution()
    assert sol.checkOnesSegment("1001") == False
    assert sol.checkOnesSegment("110") == True

    print("✓ check-if-binary-string-has-at-most-one-segment-of-ones passed")

if __name__ == '__main__':
    test()
