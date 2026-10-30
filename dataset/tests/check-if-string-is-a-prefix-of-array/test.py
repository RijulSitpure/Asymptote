class Solution:
    def isPrefixString(self, s: str, words: list[str]) -> bool:
        acc = ""
        for w in words:
            acc += w
            if acc == s:
                return True
            if len(acc) > len(s):
                return False
        return False

def test_is_prefix_string():
    sol = Solution()
    assert sol.isPrefixString("iloveleetcode", ["i", "love", "leetcode", "apples"]) == True
    assert sol.isPrefixString("iloveleetcode", ["apples", "i", "love", "leetcode"]) == False

