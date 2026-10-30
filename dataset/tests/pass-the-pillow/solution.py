class Solution:
    def passThePillow(self, n: int, time: int) -> int:
        cycle = 2 * (n - 1)
        rem = time % cycle
        if rem < n:
            return 1 + rem
        return n - (rem - (n - 1))
