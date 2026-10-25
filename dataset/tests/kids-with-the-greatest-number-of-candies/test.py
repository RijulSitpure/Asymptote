class Solution:
    def kidsWithCandies(self, candies: list[int], extraCandies: int) -> list[bool]:
        max_c = max(candies)
        return [c + extraCandies >= max_c for c in candies]

def test():
    sol = Solution()
    assert sol.kidsWithCandies([2,3,5,1,3], 3) == [True,True,True,False,True], "test 1 failed"
    assert sol.kidsWithCandies([4,2,1,1,2], 1) == [True,False,False,False,False], "test 2 failed"
    assert sol.kidsWithCandies([12,1,12], 10) == [True,False,True], "test 3 failed"
    print("✓ kids-with-the-greatest-number-of-candies passed")

if __name__ == "__main__":
    test()
