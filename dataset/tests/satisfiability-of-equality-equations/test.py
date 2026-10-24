from typing import List

class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        parent = list(range(26))
        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        def union(x: int, y: int):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
        for eq in equations:
            if eq[1] == "=":
                union(ord(eq[0]) - ord("a"), ord(eq[3]) - ord("a"))
        for eq in equations:
            if eq[1] == "!":
                if find(ord(eq[0]) - ord("a")) == find(ord(eq[3]) - ord("a")):
                    return False
        return True

def test():
    sol = Solution()
    assert sol.equationsPossible(["a==b","b!=a"]) is False, "test 1 failed"
    assert sol.equationsPossible(["b==a","a==b"]) is True, "test 2 failed"
    print("✓ satisfiability-of-equality-equations passed")

if __name__ == "__main__":
    test()
