class Solution:
    def peopleIndexes(self, favoriteCompanies: list[list[str]]) -> list[int]:
        sets = [set(fc) for fc in favoriteCompanies]
        res = []
        for i, s1 in enumerate(sets):
            is_sub = False
            for j, s2 in enumerate(sets):
                if i != j and len(s2) > len(s1) and s1.issubset(s2):
                    is_sub = True
                    break
            if not is_sub:
                res.append(i)
        return res

def test():
    sol = Solution()
    assert sol.peopleIndexes([["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]) == [0,1,4], "test 1 failed"
    assert sol.peopleIndexes([["leetcode","google","facebook"],["leetcode","amazon"],["facebook","google"]]) == [0,1], "test 2 failed"
    print("✓ people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list passed")

if __name__ == "__main__":
    test()
