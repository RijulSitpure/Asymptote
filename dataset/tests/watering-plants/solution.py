class Solution:
    def wateringPlants(self, plants: list[int], capacity: int) -> int:
        steps = 0
        water = capacity

        for i, req in enumerate(plants):
            if water < req:
                steps += 2 * i
                water = capacity
            steps += 1
            water -= req

        return steps
