class Solution:
    def getCollisionTimes(self, cars: list[list[int]]) -> list[float]:
        n = len(cars)
        ans = [-1.0] * n
        stack = []

        for i in range(n - 1, -1, -1):
            p1, s1 = cars[i]
            while stack:
                j = stack[-1]
                p2, s2 = cars[j]
                if s1 <= s2:
                    stack.pop()
                else:
                    t = (p2 - p1) / (s1 - s2)
                    if ans[j] > 0 and t >= ans[j]:
                        stack.pop()
                    else:
                        ans[i] = t
                        break
            stack.append(i)

        return ans

def test():
    sol = Solution()
    res1 = sol.getCollisionTimes([[1,2],[2,1],[4,3],[7,2]])
    expected1 = [1.0,-1.0,3.0,-1.0]
    for a, b in zip(res1, expected1):
        assert abs(a - b) < 1e-5

    print("✓ car-fleet-ii passed")

if __name__ == '__main__':
    test()
