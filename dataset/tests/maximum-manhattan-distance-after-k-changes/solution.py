class Solution:
    def maxDistance(self, s: str, k: int) -> int:
        def check(dir1: str, dir2: str) -> int:
            ans = 0
            pos = 0
            opp = 0
            for ch in s:
                if ch == dir1 or ch == dir2:
                    pos += 1
                else:
                    pos -= 1
                    opp += 1
                dist = pos + 2 * min(k, opp)
                if dist > ans:
                    ans = dist
            return ans
            
        return max(
            check("N", "E"),
            check("N", "W"),
            check("S", "E"),
            check("S", "W")
        )
