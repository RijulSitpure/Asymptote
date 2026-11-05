class Solution:
    def permute(self, n: int) -> list[list[int]]:
        ans = []
        curr = []
        vis = [False] * (n + 1)
        
        def backtrack():
            if len(curr) == n:
                ans.append(list(curr))
                return
            for x in range(1, n + 1):
                if not vis[x]:
                    if not curr or curr[-1] % 2 != x % 2:
                        vis[x] = True
                        curr.append(x)
                        backtrack()
                        curr.pop()
                        vis[x] = False
                        
        backtrack()
        return ans
