from typing import List
import collections

class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        dead = set(deadends)
        if "0000" in dead:
            return -1
        if target == "0000":
            return 0

        queue = collections.deque([("0000", 0)])
        visited = {"0000"}

        while queue:
            state, steps = queue.popleft()
            if state == target:
                return steps
            for i in range(4):
                digit = int(state[i])
                for diff in (-1, 1):
                    next_digit = (digit + diff) % 10
                    next_state = state[:i] + str(next_digit) + state[i + 1:]
                    if next_state not in dead and next_state not in visited:
                        visited.add(next_state)
                        queue.append((next_state, steps + 1))
        return -1

def test():
    sol = Solution()
    assert sol.openLock(["0201","0101","0102","1212","2002"], "0202") == 6, "test 1 failed"
    assert sol.openLock(["8888"], "0009") == 1, "test 2 failed"
    print("✓ open-the-lock passed")

if __name__ == "__main__":
    test()
