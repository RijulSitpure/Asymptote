class Solution:
    def captureForts(self, forts: list[int]) -> int:
        ans = 0
        last_idx = -1
        for i, val in enumerate(forts):
            if val != 0:
                if last_idx != -1 and forts[last_idx] == -val:
                    ans = max(ans, i - last_idx - 1)
                last_idx = i
        return ans
