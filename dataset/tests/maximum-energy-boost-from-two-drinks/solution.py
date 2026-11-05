class Solution:
    def maxEnergyBoost(self, energyDrinkA: list[int], energyDrinkB: list[int]) -> int:
        n = len(energyDrinkA)
        dpA = energyDrinkA[0]
        dpB = energyDrinkB[0]
        for i in range(1, n):
            next_dpA = max(dpA + energyDrinkA[i], dpB)
            next_dpB = max(dpB + energyDrinkB[i], dpA)
            dpA, dpB = next_dpA, next_dpB
        return max(dpA, dpB)
