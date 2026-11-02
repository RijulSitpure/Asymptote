class CategoryHandler:
    def __init__(self, categories):
        self.categories = categories
    def haveSameCategory(self, a: int, b: int) -> bool:
        return self.categories[a] == self.categories[b]

from solution import Solution
s = Solution()
assert s.numberOfCategories(6, CategoryHandler([1, 1, 2, 2, 3, 3])) == 3
assert s.numberOfCategories(5, CategoryHandler([1, 2, 3, 4, 5])) == 5
print("All tests passed for number-of-unique-categories")