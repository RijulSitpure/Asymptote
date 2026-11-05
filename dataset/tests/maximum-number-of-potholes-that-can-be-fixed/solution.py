class Solution:
    def maxPotholes(self, road: str, budget: int) -> int:
        blocks = [len(s) for s in road.split('.') if s]
        blocks.sort(reverse=True)
        fixed = 0
        for L in blocks:
            if budget >= L + 1:
                budget -= (L + 1)
                fixed += L
            else:
                can = max(0, budget - 1)
                fixed += min(L, can)
                break
        return fixed
