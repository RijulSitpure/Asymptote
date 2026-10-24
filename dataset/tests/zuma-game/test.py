import re
from collections import deque

class Solution:
    def findMinStep(self, board: str, hand: str) -> int:
        def clean(s: str) -> str:
            n = 0
            while len(s) != n:
                n = len(s)
                s = re.sub(r"([A-Z])\1{2,}", "", s)
            return s

        hand = "".join(sorted(hand))
        queue = deque([(board, hand, 0)])
        visited = {(board, hand)}

        while queue:
            curr_b, curr_h, step = queue.popleft()
            if not curr_b:
                return step
            for i in range(len(curr_h)):
                if i > 0 and curr_h[i] == curr_h[i - 1]:
                    continue
                c = curr_h[i]
                next_h = curr_h[:i] + curr_h[i + 1:]
                for j in range(len(curr_b) + 1):
                    if j > 0 and curr_b[j - 1] == c:
                        continue
                    pick = False
                    if j < len(curr_b) and curr_b[j] == c:
                        pick = True
                    elif 0 < j < len(curr_b) and curr_b[j - 1] == curr_b[j] and curr_b[j] != c:
                        pick = True
                    if pick:
                        nb = clean(curr_b[:j] + c + curr_b[j:])
                        if (nb, next_h) not in visited:
                            visited.add((nb, next_h))
                            queue.append((nb, next_h, step + 1))

        return -1

def test():
    sol = Solution()
    assert sol.findMinStep("WRRBBW", "RB") == -1, "test 1 failed"
    assert sol.findMinStep("WWRRBBWW", "WRBRW") == 2, "test 2 failed"
    assert sol.findMinStep("G", "GGGGG") == 2, "test 3 failed"
    print("✓ zuma-game passed")

if __name__ == "__main__":
    test()
