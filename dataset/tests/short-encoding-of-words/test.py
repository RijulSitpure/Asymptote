from typing import List

class Solution:
    def minimumLengthEncoding(self, words: List[str]) -> int:
        good = set(words)
        for w in words:
            for i in range(1, len(w)):
                good.discard(w[i:])
        return sum(len(w) + 1 for w in good)

def test():
    sol = Solution()
    assert sol.minimumLengthEncoding(["time", "me", "bell"]) == 10, "test 1 failed"
    assert sol.minimumLengthEncoding(["t"]) == 2, "test 2 failed"
    print("✓ short-encoding-of-words passed")

if __name__ == "__main__":
    test()
