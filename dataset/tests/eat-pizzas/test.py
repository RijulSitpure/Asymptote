
class Solution:
    def maxWeight(self, pizzas: list[int]) -> int:
        pizzas.sort(reverse=True)
        total_days = len(pizzas) // 4
        odd_days = (total_days + 1) // 2
        even_days = total_days // 2
        ans = 0
        for i in range(odd_days):
            ans += pizzas[i]
        idx = odd_days
        for _ in range(even_days):
            idx += 1
            ans += pizzas[idx]
            idx += 1
        return ans

def test_eat_pizzas():
    sol = Solution()
    assert sol.maxWeight([1, 2, 3, 4, 5, 6, 7, 8]) == 14
    assert sol.maxWeight([2, 1, 1, 1, 1, 1, 1, 1]) == 3

if __name__ == '__main__':
    test_eat_pizzas()
    print('All tests passed.')
