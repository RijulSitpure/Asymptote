class Solution:
    def sortPeople(self, names: list[str], heights: list[int]) -> list[str]:
        combined = sorted(zip(heights, names), key=lambda x: x[0], reverse=True)
        return [name for _, name in combined]
