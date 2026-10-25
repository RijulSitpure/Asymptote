class Solution:
    def findNumbers(self, nums: list[int]) -> int:
        return sum(1 for x in nums if len(str(x)) % 2 == 0)

def test():
    sol = Solution()
    assert sol.findNumbers([12,345,2,6,7896]) == 2, "test 1 failed"
    assert sol.findNumbers([555,901,482,1771]) == 1, "test 2 failed"
    print("✓ find-numbers-with-even-number-of-digits passed")

if __name__ == "__main__":
    test()
