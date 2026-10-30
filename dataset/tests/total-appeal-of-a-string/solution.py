class Solution:
    def appealSum(self, s: str) -> int:
        last = {}
        total = 0
        running = 0
        for i, ch in enumerate(s):
            running += (i - last.get(ch, -1))
            total += running
            last[ch] = i
        return total
