class Solution:
    def minDamage(self, power: int, damage: list[int], health: list[int]) -> int:
        import math
        # Turns to defeat enemy i
        turns = [math.ceil(h / power) for h in health]
        # Greedy exchange argument:
        # If we defeat enemy A then B: damage taken is turns_A * d_A + (turns_A + turns_B) * d_B
        # If we defeat enemy B then A: damage taken is turns_B * d_B + (turns_A + turns_B) * d_A
        # A then B is better if turns_A * d_B < turns_B * d_A, i.e., d_A / turns_A > d_B / turns_B
        n = len(damage)
        order = list(range(n))
        from functools import cmp_to_key
        def compare(i, j):
            # i before j if damage[i] * turns[j] > damage[j] * turns[i]
            val1 = damage[i] * turns[j]
            val2 = damage[j] * turns[i]
            if val1 > val2: return -1
            if val1 < val2: return 1
            return 0
        order.sort(key=cmp_to_key(compare))
        
        total_damage = 0
        total_d = sum(damage)
        for idx in order:
            total_damage += total_d * turns[idx]
            total_d -= damage[idx]
        return total_damage
