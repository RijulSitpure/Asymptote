class Solution:
    def poorPigs(self, buckets: int, minutesToDie: int, minutesToTest: int) -> int:
        rounds = minutesToTest // minutesToDie
        base = rounds + 1
        pigs = 0
        curr = 1
        while curr < buckets:
            curr *= base
            pigs += 1
        return pigs

def test():
    sol = Solution()
    assert sol.poorPigs(4, 15, 15) == 2, "test 1 failed"
    assert sol.poorPigs(4, 15, 30) == 2, "test 2 failed"
    assert sol.poorPigs(1000, 15, 60) == 5, "test 3 failed"
    print("✓ poor-pigs passed")

if __name__ == "__main__":
    test()
