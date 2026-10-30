class Solution:
    def minimumRefill(self, plants: list[int], capacityA: int, capacityB: int) -> int:
        left = 0
        right = len(plants) - 1
        water_a = capacityA
        water_b = capacityB
        refills = 0

        while left < right:
            if water_a < plants[left]:
                refills += 1
                water_a = capacityA
            water_a -= plants[left]
            left += 1

            if water_b < plants[right]:
                refills += 1
                water_b = capacityB
            water_b -= plants[right]
            right -= 1

        if left == right:
            if max(water_a, water_b) < plants[left]:
                refills += 1

        return refills
