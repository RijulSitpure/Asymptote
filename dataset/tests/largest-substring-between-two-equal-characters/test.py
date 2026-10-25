class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        first = {}
        ans = -1
        for i, c in enumerate(s):
            if c not in first:
                first[c] = i
            else:
                ans = max(ans, i - first[c] - 1)
        return ans

def test():
    sol = Solution()
    assert sol.maxLengthBetweenEqualCharacters("aa") == 0
    assert sol.maxLengthBetweenEqualCharacters("abca") == 2
    assert sol.maxLengthBetweenEqualCharacters("cbzxy") == -1

    print("✓ largest-substring-between-two-equal-characters passed")

if __name__ == '__main__':
    test()
