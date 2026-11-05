class Solution:
    def maxScore(self, points: list[int], m: int) -> int:
        n = len(points)
        if m < n:
            return 0
            
        def is_possible(min_val: int) -> bool:
            moves = 0
            prev_moves = 0
            for i in range(n):
                req = max(0, (min_val + points[i] - 1) // points[i] - prev_moves)
                if req > 0:
                    moves += 2 * req - 1
                    prev_moves = req - 1
                elif i + 1 < n:
                    moves += 1
                    prev_moves = 0
                if moves > m:
                    return False
            return True
            
        l = 0
        r = ((m + 1) // 2) * max(points) + 1
        ans = 0
        while l <= r:
            mid = (l + r) // 2
            if is_possible(mid):
                ans = mid
                l = mid + 1
            else:
                r = mid - 1
        return ans
