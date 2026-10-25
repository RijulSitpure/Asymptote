class Solution:
    def minimumDeletions(self, s: str) -> int:
        b_count = 0
        deletions = 0
        for c in s:
            if c == "b":
                b_count += 1
            else:
                deletions = min(deletions + 1, b_count)
        return deletions

def test():
    sol = Solution()
    assert sol.minimumDeletions("aababbab") == 2
    assert sol.minimumDeletions("bbaaaaabb") == 2

    print("✓ minimum-deletions-to-make-string-balanced passed")

if __name__ == '__main__':
    test()
