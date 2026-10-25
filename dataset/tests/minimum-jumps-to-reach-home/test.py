from collections import deque

class Solution:
    def minimumJumps(self, forbidden: list[int], a: int, b: int, x: int) -> int:
        forbidden_set = set(forbidden)
        limit = max(x, max(forbidden)) + a + b + 2000
        q = deque([(0, 0, False)])  # (pos, steps, just_backed)
        visited = {(0, False)}
        while q:
            pos, steps, just_backed = q.popleft()
            if pos == x:
                return steps
            # Forward
            next_f = pos + a
            if next_f <= limit and next_f not in forbidden_set and (next_f, False) not in visited:
                visited.add((next_f, False))
                q.append((next_f, steps + 1, False))
            # Backward
            if not just_backed:
                next_b = pos - b
                if next_b >= 0 and next_b not in forbidden_set and (next_b, True) not in visited:
                    visited.add((next_b, True))
                    q.append((next_b, steps + 1, True))
        return -1

def test():
    sol = Solution()
    assert sol.minimumJumps([14,4,18,1,15], 3, 15, 9) == 3
    assert sol.minimumJumps([8,3,16,6,12,20], 15, 13, 11) == -1
    assert sol.minimumJumps([1,6,2,14,5,17,4], 16, 9, 7) == 2

    print("✓ minimum-jumps-to-reach-home passed")

if __name__ == '__main__':
    test()
