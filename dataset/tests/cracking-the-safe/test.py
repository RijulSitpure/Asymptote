class Solution:
    def crackSafe(self, n: int, k: int) -> str:
        seen = set()
        ans = []

        def dfs(node: str) -> None:
            for x in range(k):
                edge = node + str(x)
                if edge not in seen:
                    seen.add(edge)
                    dfs(edge[1:])
                    ans.append(str(x))

        start = "0" * (n - 1)
        dfs(start)
        return "".join(reversed(ans)) + start

def test():
    sol = Solution()
    res1 = sol.crackSafe(1, 2)
    assert len(res1) == 2 and "0" in res1 and "1" in res1, "test 1 failed"
    res2 = sol.crackSafe(2, 2)
    assert len(res2) == 5, "test 2 failed"
    print("✓ cracking-the-safe passed")

if __name__ == "__main__":
    test()
