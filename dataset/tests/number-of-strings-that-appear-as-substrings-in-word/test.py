class Solution:
    def numOfStrings(self, patterns: list[str], word: str) -> int:
        return sum(p in word for p in patterns)

def test_num_of_strings():
    sol = Solution()
    assert sol.numOfStrings(["a","abc","bc","d"], "abc") == 3
    assert sol.numOfStrings(["a","b","c"], "aaaaabbbbb") == 2

