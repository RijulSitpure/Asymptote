class Solution:
    def numberOfChild(self, n: int, k: int) -> int:
        cycle = 2 * (n - 1)
        r = k % cycle
        return r if r < n else cycle - r