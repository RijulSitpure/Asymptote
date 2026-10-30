class Solution:
    def bestClosingTime(self, customers: str) -> int:
        cur_penalty = customers.count('Y')
        min_penalty = cur_penalty
        best_hour = 0
        for i, c in enumerate(customers):
            if c == 'Y':
                cur_penalty -= 1
            else:
                cur_penalty += 1
            if cur_penalty < min_penalty:
                min_penalty = cur_penalty
                best_hour = i + 1
        return best_hour
