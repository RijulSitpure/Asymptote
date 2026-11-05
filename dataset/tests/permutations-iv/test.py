
class Solution:
    def permute(self, n: int, k: int) -> list[int]:
        odds = [i for i in range(1, n + 1) if i % 2 == 1]
        evens = [i for i in range(1, n + 1) if i % 2 == 0]

        def count_ways(num_need: int, num_other: int) -> int:
            import math
            if num_need == num_other or num_need == num_other + 1:
                return math.factorial(num_need) * math.factorial(num_other)
            return 0

        total_odd_start = count_ways(len(odds), len(evens))
        total_even_start = count_ways(len(evens), len(odds))
        if k > total_odd_start + total_even_start:
            return []

        ans = []
        last_parity = -1
        for _ in range(n):
            candidates = []
            if last_parity != 1:
                candidates.extend(odds)
            if last_parity != 0:
                candidates.extend(evens)
            candidates.sort()

            placed = False
            for c in candidates:
                c_parity = c % 2
                if c_parity == 1:
                    ways = count_ways(len(evens), len(odds) - 1)
                else:
                    ways = count_ways(len(odds), len(evens) - 1)

                if k <= ways:
                    ans.append(c)
                    if c_parity == 1:
                        odds.remove(c)
                    else:
                        evens.remove(c)
                    last_parity = c_parity
                    placed = True
                    break
                else:
                    k -= ways
            if not placed:
                return []
        return ans

def test_permutations_iv():
    sol = Solution()
    assert sol.permute(4, 6) == [3, 4, 1, 2]
    assert sol.permute(3, 2) == [3, 2, 1]
    assert sol.permute(2, 3) == []

if __name__ == '__main__':
    test_permutations_iv()
    print('All tests passed.')
