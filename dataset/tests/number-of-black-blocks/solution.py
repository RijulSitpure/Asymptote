from collections import defaultdict

class Solution:
    def countBlackBlocks(self, m: int, n: int, coordinates: list[list[int]]) -> list[int]:
        block_counts = defaultdict(int)
        for r, c in coordinates:
            for dr in [0, -1]:
                for dc in [0, -1]:
                    tr, tc = r + dr, c + dc
                    if 0 <= tr < m - 1 and 0 <= tc < n - 1:
                        block_counts[(tr, tc)] += 1
        ans = [0] * 5
        for cnt in block_counts.values():
            ans[cnt] += 1
        ans[0] = (m - 1) * (n - 1) - sum(ans[1:])
        return ans
