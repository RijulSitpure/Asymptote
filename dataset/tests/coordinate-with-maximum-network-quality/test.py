import math

class Solution:
    def bestCoordinate(self, towers: list[list[int]], radius: int) -> list[int]:
        max_q = 0
        best = [0, 0]
        for x in range(51):
            for y in range(51):
                quality = 0
                for tx, ty, q in towers:
                    d = math.hypot(x - tx, y - ty)
                    if d <= radius:
                        quality += math.floor(q / (1 + d))
                if quality > max_q:
                    max_q = quality
                    best = [x, y]
        return best

def test():
    sol = Solution()
    assert sol.bestCoordinate([[1,2,5],[2,1,7],[3,1,9]], 2) == [2, 1]
    assert sol.bestCoordinate([[23,11,21]], 9) == [23, 11]
    assert sol.bestCoordinate([[1,2,13],[2,1,7],[0,1,9]], 2) == [1, 2]

    print("✓ coordinate-with-maximum-network-quality passed")

if __name__ == '__main__':
    test()
