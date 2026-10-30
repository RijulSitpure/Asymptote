class Solution:
    def canBeValid(self, s: str, locked: str) -> bool:
        n = len(s)
        if n % 2 != 0:
            return False

        # Forward pass: ensure no unmatched ')'
        open_budget = 0
        for i in range(n):
            if locked[i] == '0' or s[i] == '(':
                open_budget += 1
            else:
                open_budget -= 1
            if open_budget < 0:
                return False

        # Backward pass: ensure no unmatched '('
        close_budget = 0
        for i in range(n - 1, -1, -1):
            if locked[i] == '0' or s[i] == ')':
                close_budget += 1
            else:
                close_budget -= 1
            if close_budget < 0:
                return False

        return True
