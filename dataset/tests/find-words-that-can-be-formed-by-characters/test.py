from collections import Counter

class Solution:
    def countCharacters(self, words: list[str], chars: str) -> int:
        base = Counter(chars)
        total = 0
        for w in words:
            cw = Counter(w)
            if all(cw[c] <= base[c] for c in cw):
                total += len(w)
        return total

def test():
    sol = Solution()
    w1 = ["cat","bt","hat","tree"]; c1 = "atach"
    assert sol.countCharacters(w1, c1) == 6, "test 1 failed"
    w2 = ["hello","world","leetcode"]; c2 = "welldonehoneyr"
    assert sol.countCharacters(w2, c2) == 10, "test 2 failed"
    print("✓ find-words-that-can-be-formed-by-characters passed")

if __name__ == "__main__":
    test()
