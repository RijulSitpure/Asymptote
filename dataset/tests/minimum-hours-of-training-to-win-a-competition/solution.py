class Solution:
    def minNumberOfHours(self, initialEnergy: int, initialExperience: int, energy: list[int], experience: list[int]) -> int:
        req_energy = max(0, sum(energy) + 1 - initialEnergy)
        cur_exp = initialExperience
        req_exp = 0
        for e in experience:
            if cur_exp <= e:
                needed = e + 1 - cur_exp
                req_exp += needed
                cur_exp += needed
            cur_exp += e
        return req_energy + req_exp
