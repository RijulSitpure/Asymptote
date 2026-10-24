from typing import List
from collections import deque

class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        def get_coords(s: int):
            quot, rem = divmod(s - 1, n)
            r = n - 1 - quot
            c = rem if quot % 2 == 0 else n - 1 - rem
            return r, c

        dist = {1: 0}
        q = deque([1])
        while q:
            curr = q.popleft()
            if curr == n * n:
                return dist[curr]
            for nxt in range(curr + 1, min(curr + 6, n * n) + 1):
                r, c = get_coords(nxt)
                dest = board[r][c] if board[r][c] != -1 else nxt
                if dest not in dist:
                    dist[dest] = dist[curr] + 1
                    q.append(dest)
        return -1

def test():
    sol = Solution()
    b1 = [
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, 35, -1, -1, 13, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, 15, -1, -1, -1, -1]
    ]
    assert sol.snakesAndLadders(b1) == 4, "test 1 failed"
    b2 = [[-1, -1], [-1, 3]]
    assert sol.snakesAndLadders(b2) == 1, "test 2 failed"
    print("✓ snakes-and-ladders passed")

if __name__ == "__main__":
    test()
