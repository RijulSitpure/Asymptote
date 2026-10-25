class Solution:
    def canEat(self, candiesCount: list[int], queries: list[list[int]]) -> list[bool]:
        n = len(candiesCount)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + candiesCount[i]

        ans = []
        for fav_type, fav_day, daily_cap in queries:
            min_candies = fav_day + 1
            max_candies = (fav_day + 1) * daily_cap
            type_start = pref[fav_type] + 1
            type_end = pref[fav_type + 1]
            ans.append(not (max_candies < type_start or min_candies > type_end))
        return ans

def test():
    sol = Solution()
    assert sol.canEat([7,4,5,3,8], [[0,2,2],[4,2,4],[2,13,1000000000]]) == [True, False, True]
    assert sol.canEat([5,2,6,4,1], [[3,1,2],[4,10,3],[3,10,100],[4,100,30],[1,3,1]]) == [False, True, True, False, False]

    print("✓ can-you-eat-your-favorite-candy-on-your-favorite-day passed")

if __name__ == '__main__':
    test()
