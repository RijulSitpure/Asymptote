from collections import deque

class Solution:
    def findLexSmallestString(self, s: str, a: int, b: int) -> str:
        visited = {s}
        q = deque([s])
        best = s
        n = len(s)
        while q:
            curr = q.popleft()
            if curr < best:
                best = curr
            added = list(curr)
            for i in range(1, n, 2):
                added[i] = str((int(added[i]) + a) % 10)
            added_str = "".join(added)
            if added_str not in visited:
                visited.add(added_str)
                q.append(added_str)
            rotated_str = curr[-b:] + curr[:-b]
            if rotated_str not in visited:
                visited.add(rotated_str)
                q.append(rotated_str)
        return best

def test():
    sol = Solution()
    assert sol.findLexSmallestString("5525", 9, 2) == "2050"
    assert sol.findLexSmallestString("74", 5, 1) == "24"
    assert sol.findLexSmallestString("0011", 4, 2) == "0011"

    print("✓ lexicographically-smallest-string-after-applying-operations passed")

if __name__ == '__main__':
    test()
