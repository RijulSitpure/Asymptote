class Solution:
    def cycleLengthQueries(self, n: int, queries: list[list[int]]) -> list[int]:
        ans = []
        for a, b in queries:
            steps = 0
            while a != b:
                if a > b:
                    a //= 2
                else:
                    b //= 2
                steps += 1
            ans.append(steps + 1)
        return ans
