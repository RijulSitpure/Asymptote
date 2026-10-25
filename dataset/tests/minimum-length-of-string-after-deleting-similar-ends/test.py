class Solution:
    def minimumLength(self, s: str) -> int:
        l, r = 0, len(s) - 1
        while l < r and s[l] == s[r]:
            c = s[l]
            while l <= r and s[l] == c:
                l += 1
            while l <= r and s[r] == c:
                r -= 1
        return max(0, r - l + 1)

def test():
    sol = Solution()
    assert sol.minimumLength("ca") == 2
    assert sol.minimumLength("cabaabac") == 0
    assert sol.minimumLength("aabccabba") == 3

    print("✓ minimum-length-of-string-after-deleting-similar-ends passed")

if __name__ == '__main__':
    test()
