import heapq
from collections import defaultdict

class FoodRatings:
    def __init__(self, foods: list[str], cuisines: list[str], ratings: list[int]):
        self.food_info = {}
        self.cuisine_heaps = defaultdict(list)
        for f, c, r in zip(foods, cuisines, ratings):
            self.food_info[f] = (c, r)
            heapq.heappush(self.cuisine_heaps[c], (-r, f))

    def changeRating(self, food: str, newRating: int) -> None:
        cuisine, _ = self.food_info[food]
        self.food_info[food] = (cuisine, newRating)
        heapq.heappush(self.cuisine_heaps[cuisine], (-newRating, food))

    def highestRated(self, cuisine: str) -> str:
        h = self.cuisine_heaps[cuisine]
        while h:
            neg_r, food = h[0]
            c, cur_r = self.food_info[food]
            if -neg_r == cur_r:
                return food
            heapq.heappop(h)
        return ""
