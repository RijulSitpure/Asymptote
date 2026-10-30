class Solution:
    def distributeCookies(self, cookies: list[int], k: int) -> int:
        cookies.sort(reverse=True)
        children = [0] * k
        ans = float("inf")
        
        def backtrack(idx: int):
            nonlocal ans
            if idx == len(cookies):
                ans = min(ans, max(children))
                return
            if max(children) >= ans:
                return
            for i in range(k):
                children[i] += cookies[idx]
                backtrack(idx + 1)
                children[i] -= cookies[idx]
                if children[i] == 0:
                    break
                    
        backtrack(0)
        return ans
