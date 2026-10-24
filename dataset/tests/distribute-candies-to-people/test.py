class Solution:
    def distributeCandies(self, candies: int, num_people: int) -> list[int]:
        res = [0] * num_people
        give = 1
        idx = 0
        while candies > 0:
            amount = min(candies, give)
            res[idx % num_people] += amount
            candies -= amount
            give += 1
            idx += 1
        return res

def test():
    sol = Solution()
    assert sol.distributeCandies(7, 4) == [1, 2, 3, 1], "test 1 failed"
    assert sol.distributeCandies(10, 3) == [5, 2, 3], "test 2 failed"
    print("✓ distribute-candies-to-people passed")

if __name__ == "__main__":
    test()
