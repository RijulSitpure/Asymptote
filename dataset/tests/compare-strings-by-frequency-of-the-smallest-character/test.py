import bisect

class Solution:
    def numSmallerByFrequency(self, queries: list[str], words: list[str]) -> list[int]:
        def f(s: str) -> int:
            min_c = min(s)
            return s.count(min_c)
        
        word_freqs = sorted(f(w) for w in words)
        w_len = len(word_freqs)
        res = []
        for q in queries:
            target = f(q)
            idx = bisect.bisect_right(word_freqs, target)
            res.append(w_len - idx)
        return res

def test():
    sol = Solution()
    assert sol.numSmallerByFrequency(["cbd"], ["zaaaz"]) == [1], "test 1 failed"
    assert sol.numSmallerByFrequency(["bbb","cc"], ["a","aa","aaa","aaaa"]) == [1, 2], "test 2 failed"
    print("✓ compare-strings-by-frequency-of-the-smallest-character passed")

if __name__ == "__main__":
    test()
