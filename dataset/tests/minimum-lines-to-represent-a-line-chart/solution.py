class Solution:
    def minimumLines(self, stockPrices: list[list[int]]) -> int:
        stockPrices.sort(key=lambda x: x[0])
        n = len(stockPrices)
        if n <= 1:
            return 0
        lines = 1
        for i in range(2, n):
            x1, y1 = stockPrices[i - 2]
            x2, y2 = stockPrices[i - 1]
            x3, y3 = stockPrices[i]
            if (y2 - y1) * (x3 - x2) != (y3 - y2) * (x2 - x1):
                lines += 1
        return lines
