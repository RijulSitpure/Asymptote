class Solution:
    def maxBottlesDrunk(self, numBottles: int, numExchange: int) -> int:
        ans = numBottles
        empty = numBottles
        while empty >= numExchange:
            empty -= numExchange
            numExchange += 1
            ans += 1
            empty += 1
        return ans
