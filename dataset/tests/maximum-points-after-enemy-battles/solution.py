class Solution:
    def maximumPoints(self, enemyEnergies: list[int], currentEnergy: int) -> int:
        min_e = min(enemyEnergies)
        if currentEnergy < min_e:
            return 0
        total_energy = currentEnergy + sum(enemyEnergies) - min_e
        return total_energy // min_e