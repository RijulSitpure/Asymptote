class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        total = numBottles
        empty = numBottles
        while empty >= numExchange:
            new_bottles = empty // numExchange
            total += new_bottles
            empty = (empty % numExchange) + new_bottles
        return total

def test():
    sol = Solution()
    assert sol.numWaterBottles(9, 3) == 13, "test 1 failed"
    assert sol.numWaterBottles(15, 4) == 19, "test 2 failed"
    print("✓ water-bottles passed")

if __name__ == "__main__":
    test()
