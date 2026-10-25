class Solution:
    def maximumPopulation(self, logs: list[list[int]]) -> int:
        diff = [0] * 101
        for b, d in logs:
            diff[b - 1950] += 1
            diff[d - 1950] -= 1

        max_pop = 0
        best_year = 1950
        curr_pop = 0

        for i in range(101):
            curr_pop += diff[i]
            if curr_pop > max_pop:
                max_pop = curr_pop
                best_year = 1950 + i

        return best_year

def test():
    sol = Solution()
    assert sol.maximumPopulation([[1993,1999],[2000,2010]]) == 1993
    assert sol.maximumPopulation([[1950,1961],[1960,1971],[1970,1981]]) == 1960

if __name__ == '__main__':
    test()
