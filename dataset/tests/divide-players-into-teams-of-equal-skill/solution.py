class Solution:
    def dividePlayers(self, skill: list[int]) -> int:
        skill.sort()
        n = len(skill)
        target = skill[0] + skill[-1]
        chemistry = 0
        i, j = 0, n - 1
        while i < j:
            if skill[i] + skill[j] != target:
                return -1
            chemistry += skill[i] * skill[j]
            i += 1
            j -= 1
        return chemistry
