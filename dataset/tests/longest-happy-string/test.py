class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        counts = [["a", a], ["b", b], ["c", c]]
        res = []
        while True:
            counts.sort(key=lambda x: x[1], reverse=True)
            added = False
            for i in range(3):
                ch, cnt = counts[i]
                if cnt == 0:
                    break
                if len(res) >= 2 and res[-1] == ch and res[-2] == ch:
                    continue
                res.append(ch)
                counts[i][1] -= 1
                added = True
                break
            if not added:
                break
        return "".join(res)

def test():
    sol = Solution()
    assert sol.longestDiverseString(1, 1, 7) == "ccaccbcc", "test 1 failed"
    assert sol.longestDiverseString(7, 1, 0) == "aabaa", "test 2 failed"
    print("✓ longest-happy-string passed")

if __name__ == "__main__":
    test()
