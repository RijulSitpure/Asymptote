class Solution:
    def numOfBurgers(self, tomatoSlices: int, cheeseSlices: int) -> list[int]:
        diff = tomatoSlices - 2 * cheeseSlices
        if diff < 0 or diff % 2 != 0:
            return []
        jumbo = diff // 2
        small = cheeseSlices - jumbo
        if small < 0:
            return []
        return [jumbo, small]

def test():
    sol = Solution()
    assert sol.numOfBurgers(16, 7) == [1, 6], "test 1 failed"
    assert sol.numOfBurgers(17, 4) == [], "test 2 failed"
    assert sol.numOfBurgers(4, 17) == [], "test 3 failed"
    print("✓ number-of-burgers-with-no-waste-of-ingredients passed")

if __name__ == "__main__":
    test()
