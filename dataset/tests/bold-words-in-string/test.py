from typing import List

class Solution:
    def boldWords(self, words: List[str], s: str) -> str:
        n = len(s)
        bold = [False] * n
        for word in words:
            wl = len(word)
            start = 0
            while True:
                idx = s.find(word, start)
                if idx == -1:
                    break
                for k in range(idx, idx + wl):
                    bold[k] = True
                start = idx + 1
        res = []
        for i in range(n):
            if bold[i] and (i == 0 or not bold[i - 1]):
                res.append("<b>")
            res.append(s[i])
            if bold[i] and (i == n - 1 or not bold[i + 1]):
                res.append("</b>")
        return "".join(res)

def test():
    sol = Solution()
    assert sol.boldWords(["ab", "bc"], "aabcd") == "a<b>abc</b>d", "test 1 failed"
    assert sol.boldWords(["ab", "cb"], "aabcd") == "a<b>ab</b>cd", "test 2 failed"
    assert sol.boldWords(["b", "c"], "aabcd") == "aa<b>bc</b>d", "test 3 failed"
    print("✓ bold-words-in-string passed")

if __name__ == "__main__":
    test()
