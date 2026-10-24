from collections import deque
from typing import List

class Solution:
    def slidingPuzzle(self, board: List[List[int]]) -> int:
        start = "".join(str(val) for row in board for val in row)
        target = "123450"
        moves = {
            0: [1, 3],
            1: [0, 2, 4],
            2: [1, 5],
            3: [0, 4],
            4: [1, 3, 5],
            5: [2, 4]
        }
        queue = deque([(start, 0)])
        visited = {start}

        while queue:
            state, step = queue.popleft()
            if state == target:
                return step
            zero_idx = state.index('0')
            state_list = list(state)
            for nxt in moves[zero_idx]:
                state_list[zero_idx], state_list[nxt] = state_list[nxt], state_list[zero_idx]
                nxt_state = "".join(state_list)
                if nxt_state not in visited:
                    visited.add(nxt_state)
                    queue.append((nxt_state, step + 1))
                state_list[zero_idx], state_list[nxt] = state_list[nxt], state_list[zero_idx]

        return -1

def test():
    sol = Solution()
    assert sol.slidingPuzzle([[1, 2, 3], [4, 0, 5]]) == 1, "test 1 failed"
    assert sol.slidingPuzzle([[1, 2, 3], [5, 4, 0]]) == -1, "test 2 failed"
    assert sol.slidingPuzzle([[4, 1, 2], [5, 0, 3]]) == 5, "test 3 failed"
    print("✓ sliding-puzzle passed")

if __name__ == "__main__":
    test()
