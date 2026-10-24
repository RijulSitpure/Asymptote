class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        parent = list(range(26))

        def find(i: int) -> int:
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]

        def union(i: int, j: int):
            ri, rj = find(i), find(j)
            if ri != rj:
                if ri < rj:
                    parent[rj] = ri
                else:
                    parent[ri] = rj

        for c1, c2 in zip(s1, s2):
            union(ord(c1) - 97, ord(c2) - 97)

        return "".join(chr(find(ord(c) - 97) + 97) for c in baseStr)

def test():
    sol = Solution()
    assert sol.smallestEquivalentString("parker", "morris", "parser") == "makkek", "test 1 failed"
    assert sol.smallestEquivalentString("hello", "world", "hold") == "hdld", "test 2 failed"
    assert sol.smallestEquivalentString("leetcode", "programs", "sourcecode") == "aauaaaaada", "test 3 failed"
    print("✓ lexicographically-smallest-equivalent-string passed")

if __name__ == "__main__":
    test()
