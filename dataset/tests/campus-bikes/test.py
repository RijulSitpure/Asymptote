from typing import List

class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> List[int]:
        buckets = [[] for _ in range(2001)]
        for i, (wx, wy) in enumerate(workers):
            for j, (bx, by) in enumerate(bikes):
                d = abs(wx - bx) + abs(wy - by)
                buckets[d].append((i, j))

        res = [-1] * len(workers)
        assigned_bikes = set()
        assigned_count = 0
        for d in range(2001):
            for w, b in buckets[d]:
                if res[w] == -1 and b not in assigned_bikes:
                    res[w] = b
                    assigned_bikes.add(b)
                    assigned_count += 1
                    if assigned_count == len(workers):
                        return res
        return res

def test():
    sol = Solution()
    w1 = [[0,0],[2,1]]
    b1 = [[1,2],[3,3]]
    assert sol.assignBikes(w1, b1) == [1, 0], "test 1 failed"
    w2 = [[0,0],[1,1],[2,0]]
    b2 = [[1,0],[2,2],[2,1]]
    assert sol.assignBikes(w2, b2) == [0, 2, 1], "test 2 failed"
    print("✓ campus-bikes passed")

if __name__ == "__main__":
    test()
