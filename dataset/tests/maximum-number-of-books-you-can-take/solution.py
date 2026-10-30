class Solution:
    def maximumBooks(self, books: list[int]) -> int:
        n = len(books)
        stk = []
        dp = [0] * n
        for i in range(n):
            while stk and books[stk[-1]] - stk[-1] >= books[i] - i:
                stk.pop()
            j = stk[-1] if stk else -1
            cnt = min(books[i], i - j)
            first_val = books[i] - cnt + 1
            sum_books = cnt * (first_val + books[i]) // 2
            dp[i] = (dp[j] if j != -1 else 0) + sum_books
            stk.append(i)
        return max(dp)
