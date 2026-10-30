class Solution:
    def calculateTax(self, brackets: list[list[int]], income: int) -> float:
        total_tax = 0.0
        prev = 0
        for upper, percent in brackets:
            if income <= prev:
                break
            taxable = min(income, upper) - prev
            total_tax += taxable * (percent / 100.0)
            prev = upper
        return total_tax
