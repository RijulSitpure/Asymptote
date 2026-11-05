class Solution:
    def maxPointsInsideSquare(self, points: list[list[int]], s: str) -> int:
        min_sizes = [float('inf')] * 26
        second_min_size = float('inf')

        for (x, y), ch in zip(points, s):
            sz = max(abs(x), abs(y))
            idx = ord(ch) - ord('a')
            if sz < min_sizes[idx]:
                second_min_size = min(second_min_size, min_sizes[idx])
                min_sizes[idx] = sz
            else:
                second_min_size = min(second_min_size, sz)

        return sum(1 for sz in min_sizes if sz < second_min_size)
