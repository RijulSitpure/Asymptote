import sys

class Solution:
    def validWordAbbreviation(self, word: str, abbr: str) -> bool:
        i = 0
        j = 0
        m, n = len(word), len(abbr)
        while i < m and j < n:
            if abbr[j].isdigit():
                if abbr[j] == "0":
                    return False
                val = 0
                while j < n and abbr[j].isdigit():
                    val = val * 10 + int(abbr[j])
                    j += 1
                i += val
            else:
                if word[i] != abbr[j]:
                    return False
                i += 1
                j += 1
        return i == m and j == n

def test():
    sol = Solution()
    assert sol.validWordAbbreviation("internationalization", "i12iz4n") is True, "test 1 failed"
    assert sol.validWordAbbreviation("apple", "a2e") is False, "test 2 failed"
    assert sol.validWordAbbreviation("substitution", "s010n") is False, "test 3 failed"
    print("✓ valid-word-abbreviation passed")

if __name__ == "__main__":
    test()
