class Solution:
    def longestWord(self, words: list[str]) -> str:
        word_set = set(words)
        best = ""
        for w in words:
            if all(w[:k] in word_set for k in range(1, len(w))):
                if len(w) > len(best) or (len(w) == len(best) and w < best):
                    best = w
        return best

def test():
    sol = Solution()
    assert sol.longestWord(["k","ki","kir","kira","kiran"]) == "kiran"
    assert sol.longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"]) == "apple"
    assert sol.longestWord(["abc", "bc", "ab", "qwe"]) == ""

if __name__ == '__main__':
    test()
