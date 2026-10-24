from collections import Counter

class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        counts = Counter(tiles)

        def dfs() -> int:
            total = 0
            for ch in counts:
                if counts[ch] > 0:
                    total += 1
                    counts[ch] -= 1
                    total += dfs()
                    counts[ch] += 1
            return total

        return dfs()

def test():
    sol = Solution()
    assert sol.numTilePossibilities("AAB") == 8, "test 1 failed"
    assert sol.numTilePossibilities("AAABBC") == 188, "test 2 failed"
    assert sol.numTilePossibilities("V") == 1, "test 3 failed"
    print("✓ letter-tile-possibilities passed")

if __name__ == "__main__":
    test()
