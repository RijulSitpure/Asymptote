import bisect

class Solution:
    def shortestDistanceColor(self, colors: list[int], queries: list[list[int]]) -> list[int]:
        pos = {1: [], 2: [], 3: []}
        for i, c in enumerate(colors):
            pos[c].append(i)
        
        res = []
        for idx, c in queries:
            arr = pos[c]
            if not arr:
                res.append(-1)
                continue
            i = bisect.bisect_left(arr, idx)
            best = float('inf')
            if i < len(arr):
                best = min(best, abs(arr[i] - idx))
            if i > 0:
                best = min(best, abs(arr[i - 1] - idx))
            res.append(best)
        return res

def test():
    sol = Solution()
    c1 = [1,1,2,1,3,2,2,3,3]; q1 = [[1,3],[2,2],[6,1]]
    assert sol.shortestDistanceColor(c1, q1) == [3,0,3], "test 1 failed"
    c2 = [1,2]; q2 = [[0,3]]
    assert sol.shortestDistanceColor(c2, q2) == [-1], "test 2 failed"
    print("✓ shortest-distance-to-target-color passed")

if __name__ == "__main__":
    test()
