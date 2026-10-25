class Solution:
    def filterRestaurants(self, restaurants: list[list[int]], veganFriendly: int, maxPrice: int, maxDistance: int) -> list[int]:
        filtered = [
            r for r in restaurants
            if (not veganFriendly or r[2] == 1) and r[3] <= maxPrice and r[4] <= maxDistance
        ]
        filtered.sort(key=lambda r: (r[1], r[0]), reverse=True)
        return [r[0] for r in filtered]

def test():
    sol = Solution()
    assert sol.filterRestaurants([[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], 1, 50, 10) == [3,1,5], "test 1 failed"
    assert sol.filterRestaurants([[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], 0, 50, 10) == [4,3,2,1,5], "test 2 failed"
    print("✓ filter-restaurants-by-vegan-friendly-price-and-distance passed")

if __name__ == "__main__":
    test()
