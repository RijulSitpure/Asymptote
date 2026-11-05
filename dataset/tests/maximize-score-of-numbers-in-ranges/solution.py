class Solution:
    def maxPossibleScore(self, start: list[int], d: int) -> int:
        start.sort()
        n = len(start)
        
        def check(score: int) -> bool:
            curr = start[0]
            for i in range(1, n):
                nxt = max(curr + score, start[i])
                if nxt > start[i] + d:
                    return False
                curr = nxt
            return True
            
        low = 0
        high = (start[-1] + d) - start[0]
        ans = 0
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans
