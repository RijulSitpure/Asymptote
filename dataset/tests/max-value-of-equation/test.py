from collections import deque

class Solution:
    def findMaxValueOfEquation(self, points: list[list[int]], k: int) -> int:
        q = deque()
        ans = float("-inf")
        for x, y in points:
            while q and x - q[0][1] > k:
                q.popleft()
            if q:
                ans = max(ans, q[0][0] + y + x)
            val = y - x
            while q and q[-1][0] <= val:
                q.pop()
            q.append((val, x))
        return ans

def test():
    sol = Solution()
    assert sol.findMaxValueOfEquation([[1,3],[2,0],[5,10],[6,-10]], 1) == 4, "test 1 failed"
    assert sol.findMaxValueOfEquation([[0,0],[3,0],[9,2]], 3) == 3, "test 2 failed"
    print("✓ max-value-of-equation passed")

if __name__ == "__main__":
    test()
