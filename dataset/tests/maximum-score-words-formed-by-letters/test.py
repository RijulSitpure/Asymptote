from collections import Counter

class Solution:
    def maxScoreWords(self, words: list[str], letters: list[str], score: list[int]) -> int:
        inventory = Counter(letters)
        
        word_reqs = []
        for w in words:
            req = Counter(w)
            w_score = sum(score[ord(c) - ord('a')] for c in w)
            word_reqs.append((req, w_score))
            
        def dfs(idx, inv):
            if idx == len(words):
                return 0
            res = dfs(idx + 1, inv)
            req, w_score = word_reqs[idx]
            if all(inv[c] >= cnt for c, cnt in req.items()):
                for c, cnt in req.items():
                    inv[c] -= cnt
                res = max(res, w_score + dfs(idx + 1, inv))
                for c, cnt in req.items():
                    inv[c] += cnt
            return res
            
        return dfs(0, inventory)

def test():
    sol = Solution()
    w1 = ["dog","cat","dad","good"]
    l1 = ["a","a","c","d","d","d","g","o","o"]
    s1 = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
    assert sol.maxScoreWords(w1, l1, s1) == 23, "test 1 failed"
    print("✓ maximum-score-words-formed-by-letters passed")

if __name__ == "__main__":
    test()
