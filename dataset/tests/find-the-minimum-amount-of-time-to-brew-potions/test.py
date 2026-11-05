class Solution:
    def minTime(self, skill: list[int], mana: list[int]) -> int:
        sum_skill = sum(skill)
        prev_wizard_done = sum_skill * mana[0]

        for j in range(1, len(mana)):
            prev_potion_done = prev_wizard_done
            for i in range(len(skill) - 2, -1, -1):
                prev_potion_done -= skill[i + 1] * mana[j - 1]
                prev_wizard_done = max(prev_potion_done, prev_wizard_done - skill[i] * mana[j])
            prev_wizard_done += sum_skill * mana[j]

        return prev_wizard_done

def run_tests():
    s = Solution()
    assert s.minTime([1, 2], [2, 3]) == 12
    print("All tests passed for find-the-minimum-amount-of-time-to-brew-potions")

if __name__ == '__main__':
    run_tests()
