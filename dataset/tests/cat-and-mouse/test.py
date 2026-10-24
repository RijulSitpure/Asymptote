from typing import List
from collections import deque

class Solution:
    def catMouseGame(self, graph: List[List[int]]) -> int:
        n = len(graph)
        MOUSE, CAT = 1, 2
        DRAW, MOUSE_WIN, CAT_WIN = 0, 1, 2

        color = {}
        degree = {}

        for m in range(n):
            for c in range(n):
                degree[m, c, MOUSE] = len(graph[m])
                degree[m, c, CAT] = len([nxt for nxt in graph[c] if nxt != 0])

        q = deque()
        for c in range(1, n):
            color[0, c, MOUSE] = MOUSE_WIN
            color[0, c, CAT] = MOUSE_WIN
            q.append((0, c, MOUSE, MOUSE_WIN))
            q.append((0, c, CAT, MOUSE_WIN))
            color[c, c, MOUSE] = CAT_WIN
            color[c, c, CAT] = CAT_WIN
            q.append((c, c, MOUSE, CAT_WIN))
            q.append((c, c, CAT, CAT_WIN))

        while q:
            m, c, turn, result = q.popleft()
            if m == 1 and c == 2 and turn == MOUSE:
                return result
            prev_turn = CAT if turn == MOUSE else MOUSE
            parents = []
            if prev_turn == MOUSE:
                parents = [(prev_m, c) for prev_m in graph[m]]
            else:
                parents = [(m, prev_c) for prev_c in graph[c] if prev_c != 0]

            for prev_m, prev_c in parents:
                state = (prev_m, prev_c, prev_turn)
                if state in color:
                    continue
                if (prev_turn == MOUSE and result == MOUSE_WIN) or (prev_turn == CAT and result == CAT_WIN):
                    color[state] = result
                    q.append((prev_m, prev_c, prev_turn, result))
                else:
                    degree[state] -= 1
                    if degree[state] == 0:
                        lose_res = CAT_WIN if prev_turn == MOUSE else MOUSE_WIN
                        color[state] = lose_res
                        q.append((prev_m, prev_c, prev_turn, lose_res))
        return 0

def test():
    sol = Solution()
    g1 = [[2, 5], [3], [0, 4, 5], [1, 4, 5], [2, 3], [0, 2, 3]]
    assert sol.catMouseGame(g1) == 0, "test 1 failed"
    g2 = [[1, 3], [0], [3], [0, 2]]
    assert sol.catMouseGame(g2) == 1, "test 2 failed"
    print("✓ cat-and-mouse passed")

if __name__ == "__main__":
    test()
