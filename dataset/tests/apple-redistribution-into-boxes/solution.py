class Solution:
    def minimumBoxes(self, apple: list[int], capacity: list[int]) -> int:
        total = sum(apple)
        capacity.sort(reverse=True)
        cur = 0
        for i, c in enumerate(capacity):
            cur += c
            if cur >= total:
                return i + 1
        return len(capacity)
