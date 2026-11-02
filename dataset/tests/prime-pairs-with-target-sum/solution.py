class Solution:
    def findPrimePairs(self, n: int) -> list[list[int]]:
        if n < 4:
            return []
        is_prime = [True] * (n + 1)
        is_prime[0] = is_prime[1] = False
        for p in range(2, int(n**0.5) + 1):
            if is_prime[p]:
                for mult in range(p * p, n + 1, p):
                    is_prime[mult] = False
        ans = []
        for x in range(2, n // 2 + 1):
            if is_prime[x] and is_prime[n - x]:
                ans.append([x, n - x])
        return ans
