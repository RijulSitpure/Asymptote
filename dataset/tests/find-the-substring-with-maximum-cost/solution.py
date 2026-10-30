class Solution:
    def maximumCostSubstring(self, s: str, chars: str, vals: list[int]) -> int:
        val_map = {c: v for c, v in zip(chars, vals)}
        max_cost = 0
        curr = 0
        for ch in s:
            val = val_map.get(ch, ord(ch) - ord('a') + 1)
            curr = max(0, curr + val)
            max_cost = max(max_cost, curr)
        return max_cost
