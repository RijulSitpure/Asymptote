from typing import List

class Solution:
    def expand(self, s: str) -> List[str]:
        groups = []
        i = 0
        n = len(s)
        while i < n:
            if s[i] == '{':
                j = s.find('}', i)
                groups.append(sorted(s[i + 1:j].split(',')))
                i = j + 1
            else:
                groups.append([s[i]])
                i += 1

        res = []
        def dfs(idx: int, path: list[str]):
            if idx == len(groups):
                res.append("".join(path))
                return
            for ch in groups[idx]:
                path.append(ch)
                dfs(idx + 1, path)
                path.pop()

        dfs(0, [])
        return res

def test():
    sol = Solution()
    assert sol.expand("{a,b}c{d,e}f") == ["acdf","acef","bcdf","bcef"], "test 1 failed"
    assert sol.expand("abcd") == ["abcd"], "test 2 failed"
    print("✓ brace-expansion passed")

if __name__ == "__main__":
    test()
