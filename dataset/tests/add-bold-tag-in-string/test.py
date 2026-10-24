from typing import List

class Solution:
    def addBoldTag(self, s: str, words: List[str]) -> str:
        n = len(s)
        bold = [False] * n

        for w in words:
            start = s.find(w)
            while start != -1:
                for i in range(start, start + len(w)):
                    bold[i] = True
                start = s.find(w, start + 1)

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
    assert sol.addBoldTag("abcxyz123", ["abc","123"]) == "<b>abc</b>xyz<b>123</b>", "test 1 failed"
    assert sol.addBoldTag("aaabbcc", ["aaa","aab","bc"]) == "<b>aaabbc</b>c", "test 2 failed"
    print("✓ add-bold-tag-in-string passed")

if __name__ == "__main__":
    test()
