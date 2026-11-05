
class Solution:
    def longestCommonPrefix(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        i = j = 0
        removed = False
        while i < n and j < m:
            if s[i] == t[j]:
                i += 1
                j += 1
            elif not removed:
                removed = True
                i += 1
            else:
                break
        return j

def test_longest_common_prefix_after_at_most_one_removal():
    sol = Solution()
    assert sol.longestCommonPrefix("maddist", "mad") == 3
    assert sol.longestCommonPrefix("madist", "mad") == 3
    assert sol.longestCommonPrefix("a", "b") == 0

if __name__ == '__main__':
    test_longest_common_prefix_after_at_most_one_removal()
    print('All tests passed.')
