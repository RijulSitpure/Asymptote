import bisect

class Solution:
    def maximumWhiteTiles(self, tiles: list[list[int]], carpetLen: int) -> int:
        tiles.sort(key=lambda x: x[0])
        n = len(tiles)
        starts = [t[0] for t in tiles]
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + (tiles[i][1] - tiles[i][0] + 1)

        ans = 0
        for i in range(n):
            carpet_end = tiles[i][0] + carpetLen - 1
            idx = bisect.bisect_right(starts, carpet_end) - 1
            total = prefix[idx] - prefix[i]
            if tiles[idx][1] <= carpet_end:
                total += (tiles[idx][1] - tiles[idx][0] + 1)
            else:
                total += (carpet_end - tiles[idx][0] + 1)
            ans = max(ans, total)
        return ans
