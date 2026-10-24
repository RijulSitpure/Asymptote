from collections import defaultdict

class Solution:
    def uniqueLetterString(self, s: str) -> int:
        pos = defaultdict(lambda: [-1])
        for i, ch in enumerate(s):
            pos[ch].append(i)
        for ch in pos:
            pos[ch].append(len(s))

        ans = 0
        for ch, lst in pos.items():
            for i in range(1, len(lst) - 1):
                ans += (lst[i] - lst[i - 1]) * (lst[i + 1] - lst[i])
        return ans

def test():
    sol = Solution()
    assert sol.uniqueLetterString("ABC") == 10, "test 1 failed"
    assert sol.uniqueLetterString("ABA") == 8, "test 2 failed"
    assert sol.uniqueLetterString("LEETCODE") == 92, "test 3 failed"
    print("✓ count-unique-characters-of-all-substrings-of-a-given-string passed")

if __name__ == "__main__":
    test()
