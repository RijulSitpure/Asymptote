from collections import Counter

class Solution:
    def findEvenNumbers(self, digits: list[int]) -> list[int]:
        available = Counter(digits)
        ans = []

        for num in range(100, 1000, 2):
            d1, rem = divmod(num, 100)
            d2, d3 = divmod(rem, 10)

            need = Counter([d1, d2, d3])
            if all(available[d] >= count for d, count in need.items()):
                ans.append(num)

        return ans
