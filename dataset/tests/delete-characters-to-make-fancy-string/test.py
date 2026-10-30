class Solution:
    def makeFancyString(self, s: str) -> str:
        res = []
        for c in s:
            if len(res) >= 2 and res[-1] == c and res[-2] == c:
                continue
            res.append(c)
        return "".join(res)

def test_make_fancy_string():
    sol = Solution()
    assert sol.makeFancyString("leeetcode") == "leetcode"
    assert sol.makeFancyString("aaabaaaa") == "aabaa"
    assert sol.makeFancyString("aab") == "aab"

