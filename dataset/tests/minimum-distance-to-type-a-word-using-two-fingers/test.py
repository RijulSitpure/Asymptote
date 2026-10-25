class Solution:
    def minimumDistance(self, word: str) -> int:
        def dist(p1, p2):
            if p1 == 26 or p2 == 26:
                return 0
            r1, c1 = divmod(p1, 6)
            r2, c2 = divmod(p2, 6)
            return abs(r1 - r2) + abs(c1 - c2)
        dp = {26: 0}
        for i, ch in enumerate(word):
            cur = ord(ch) - ord("A")
            nxt = {}
            for other, d in dp.items():
                prev = 26 if i == 0 else ord(word[i - 1]) - ord("A")
                nxt[other] = min(nxt.get(other, float("inf")), d + dist(prev, cur))
                nxt[prev] = min(nxt.get(prev, float("inf")), d + dist(other, cur))
            dp = nxt
        return min(dp.values())

def test():
    sol = Solution()
    assert sol.minimumDistance("CAKE") == 3, "test 1 failed"
    assert sol.minimumDistance("HAPPY") == 6, "test 2 failed"
    print("✓ minimum-distance-to-type-a-word-using-two-fingers passed")

if __name__ == "__main__":
    test()
