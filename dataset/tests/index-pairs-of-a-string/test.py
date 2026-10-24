from typing import List

class Solution:
    def indexPairs(self, text: str, words: List[str]) -> List[List[int]]:
        word_set = set(words)
        n = len(text)
        res = []
        for i in range(n):
            for j in range(i, n):
                if text[i:j + 1] in word_set:
                    res.append([i, j])
        return res

def test():
    sol = Solution()
    assert sol.indexPairs("thestoryofleetcodeandme", ["story","fleet","leetcode"]) == [[3,7],[9,13],[10,17]], "test 1 failed"
    assert sol.indexPairs("ababa", ["aba","ab"]) == [[0,1],[0,2],[2,3],[2,4]], "test 2 failed"
    print("✓ index-pairs-of-a-string passed")

if __name__ == "__main__":
    test()
