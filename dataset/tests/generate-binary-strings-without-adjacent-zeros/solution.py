class Solution:
    def validStrings(self, n: int) -> list[str]:
        ans = []
        def dfs(path):
            if len(path) == n:
                ans.append("".join(path))
                return
            path.append('1')
            dfs(path)
            path.pop()
            if not path or path[-1] == '1':
                path.append('0')
                dfs(path)
                path.pop()
        dfs([])
        return ans