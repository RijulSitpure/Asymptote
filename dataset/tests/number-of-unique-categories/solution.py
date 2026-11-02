class Solution:
    def numberOfCategories(self, n: int, categoryHandler) -> int:
        representatives = []
        for i in range(n):
            matched = False
            for r in representatives:
                if categoryHandler.haveSameCategory(i, r):
                    matched = True
                    break
            if not matched:
                representatives.append(i)
        return len(representatives)